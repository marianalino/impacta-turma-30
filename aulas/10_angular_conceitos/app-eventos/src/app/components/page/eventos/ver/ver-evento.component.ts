import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evento } from 'src/app/interfaces/evento';
import { WebserviceService } from 'src/app/services/webservice.service';

@Component({
	selector: 'app-ver',
	templateUrl: './ver-evento.component.html',
	styleUrls: ['./ver-evento.component.scss']
})
export class VerEventoComponent implements OnInit {
	evento: Evento;

	constructor(
		private activatedRoute: ActivatedRoute,
		private webservice: WebserviceService
	) {
		this.evento = {
			descricao: "",
			data: "",
			preco: 0
		}
	}

	ngOnInit(): void {
		const id = this.activatedRoute.snapshot.paramMap.get('idEvento');

		this.webservice.getEvento(id).subscribe(resposta => {
			this.evento = resposta;
		})
	}

}
