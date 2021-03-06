import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class LogService {
	showLog = environment.featureFlag.showLog;

	constructor() { }

	// this.analytics.register('erro', 'criação de evento', 'data, usuario, erro')

	show(type: any, ...value: any[]){
		if(this.showLog){
			const hora = "> "+ new Date().toLocaleString('pt-BR', { timeZone:'America/Sao_Paulo' });

			switch(type){
				case 'error':
					console.error(hora);
					console.error(value);
					break;
				case 'info':
					console.info(hora);
					console.info(value);
					break;
				case 'warning':
					console.warn(hora);
					console.warn(value);
					break;
				default:
					console.log(hora);
					console.log(value);
					break;
			}
		}
	}
}
