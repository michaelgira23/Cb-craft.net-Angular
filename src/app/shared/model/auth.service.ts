import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';

import { SocketService } from './socket.service';

@Injectable()
export class AuthService {

	$auth: BehaviorSubject<JWT> = new BehaviorSubject(null);

	constructor(private socketService: SocketService) {
		this.socketService.on('connect', status => {
			if (status.isAuthenticated) {
				this.$auth.next(this.socketService.socket.authToken);
			} else {
				this.$auth.next(null);
			}
		});
	}

	login(credentials: Credentials) {
		return Observable.create(observer => {
			this.socketService.emit('login', credentials, err => {
				if (err) {
					observer.error(err);
				} else {
					observer.next(err);
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
	[key: string]: string;
}
