import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';

import { SocketService } from './socket.service';

@Injectable()
export class AuthService {

	$auth: BehaviorSubject<JWT> = new BehaviorSubject(null);

	constructor(private socketService: SocketService) {
		this.socketService.on('connect')
			.subscribe(({ data }) => {
				if (data.isAuthenticated) {
					this.$auth.next(this.socketService.socket.authToken);
				} else {
					this.$auth.next(null);
				}
			}
		);
	}

	login(credentials: Credentials) {
		return this.socketService.emit('login', credentials)
			.do(() => {
				setTimeout(() => {
					this.$auth.next(this.socketService.socket.authToken);
				}, 0);
			});
	}

	logout() {
		return Observable.create(observer => {
			this.socketService.socket.deauthenticate(err => {
				if (err) {
					observer.error(err);
				} else {
					this.$auth.next(null);
					observer.next();
				}
				observer.complete();
			});
		});
	}

}

export interface Credentials {
	ign: string;
	password: string;
}

export interface JWT {
	ign: string;
	scopes: string[];
	iat: number;
	exp: number;
}
