var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

global.db = mongoose.connect('mongodb://localhost:27017/turma30', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

load('models').into(app);

var Evento = app.models.eventosm;

// apenas uma mensagem para o usuário ler no navegador caso abra a tela
app.get('/', function (request, response) {
	response.send("Webservice no ar!");
})

// lista de todos os eventos
app.get('/eventos', function (request, response) {
	Evento.find(function (erro, retorno) {
		if (erro) {
			response.json(erro);
		} else {
			response.json(retorno);
		}
	})
})

// pegar somente 1 evento
app.get('/evento/:id', function (request, response) {
	var id = request.params.id;

	Evento.findById(id, function(erro, evento){
		if(erro){
			response.json(erro);
		} else{
			response.json(evento);
		}
	});
})

// criar um novo evento
app.post('/evento', function (request, response) {
	// criamos a estrutura do evento baseado nos dados esperados do model
	var evento = {
		'descricao': request.body.descricao,
		'data': request.body.data,
		'preco': request.body.preco
	};

	Evento.create(evento, function(erro, evento){
		if(erro){
			response.json(erro);
		} else{
			response.json(evento);
		}
	})
})

// atualizar um evento
app.put('/evento/:id', function (request, response) {

})

// deletar um evento
app.delete('/evento/:id', function (request, response) {

})

app.listen(3200, function () {
	console.log("API rodando");
});