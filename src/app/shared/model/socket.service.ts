import { environment } from '../../../environments/environment';

import { Injectable } from '@angular/core';
import socketCluster from 'socketcluster-client';

@Injectable()
export class SocketService {

	socket: any;

	constructor() {
		this.socket = socketCluster.connect({
			hostname: environment.socketCluster.hostname,
			secure: environment.socketCluster.secure,
			port: environment.socketCluster.port
		});

		this.socket.on('connect', status => {
			console.log('Connected!');
			if (status.isAuthenticated) {
				console.log('We are authenticated!', this.socket.authToken);
			} else {
				console.log('We are NOT authenticated!');
			}
		});
	}

	emit(eventName: string, data?: any, callback?: (any) => void) {
		this.socket.emit(eventName, data, callback);
	}

	on(eventName: string, callback: (any) => void) {
		this.socket.on(eventName, callback);
	}

}
