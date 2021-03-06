import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../interfaces/evento';
import { Usuario } from '../interfaces/usuario';

@Injectable({
	providedIn: 'root'
})
export class WebserviceService {
	// urlEnvCRUD: string = environment.urlCRUD;
	// urlEnvList: string = environment.urlList;

	urlCRUDEvento: string = "http://localhost:3200/evento";
	urlCRUDUsuario: string = "http://localhost:3200/usuario";
	urlListaEventos: string = "http://localhost:3200/eventos";
	urlListaUsuarios: string = "http://localhost:3200/usuarios";

	// HttpClient serve como o http que usamos no AngularJS para requisições
	constructor(private http: HttpClient) { }

	// criamos uma função publica para ser acessada pela aplicação
	// a função é um observable que vai aguardar e observar uma chamada/requisição e retornar 'algo'
	// esse 'algo' é tipado no tipo de 'Evento[]' - que significa uma lista por conta dos colchetes e Evento que é a interface que criamos
	// o observable por aguardar tem como padrão o return, e já solicitamos diretamente a requisição do tipo get para pegar os eventos da nossa API
	// falamos também para a requisição o que é esperado no seu tipo = Evento[]
	// e falamos de onde esperamos essa lista = urlList
	public getEventos(): Observable<Evento[]>{
		return this.http.get<Evento[]>(this.urlListaEventos);
	}

	public getUsuarios(): Observable<Usuario[]>{
		return this.http.get<Usuario[]>(this.urlListaUsuarios);
	}

	public getEvento(id: any): Observable<Evento>{
		const url = `${this.urlCRUDEvento}/${id}`;
		return this.http.get<Evento>(url);
	}

	public getUsuario(id: any): Observable<Usuario>{
		const url = `${this.urlCRUDUsuario}/${id}`;
		return this.http.get<Usuario>(url);
	}

	public postEvento(evento: Evento): Observable<Evento>{
		return this.http.post<Evento>(this.urlCRUDEvento, evento)
	}

	public putEvento(evento: Evento): Observable<Evento>{
		const url = `${this.urlCRUDEvento}/${evento._id}`;
		return this.http.put<Evento>(url, evento);
	}

	public deleteEvento(id: any): Observable<Evento>{
		const url = `${this.urlCRUDEvento}/${id}`;
		return this.http.delete<Evento>(url);
	}
}
