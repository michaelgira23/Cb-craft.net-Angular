import { environment } from '../environments/environment';

import { Injectable } from '@angular/core';
import socketCluster from 'socketcluster-client';

@Injectable()
export class SocketService {

	socket: any;

	constructor() {
		this.socket = socketCluster.connect({
			hostname: environment.socketCluster.hostname,
			secure: environment.socketCluster.secure,
			port: environment.socketCluster.port,
			// autoReconnect: true
		});
		console.log('socket cluster', socketCluster);
		console.log('socket', this.socket);
	}

}
