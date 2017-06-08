import { environment } from '../../../environments/environment';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
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

	emit(eventName: string, data?: any) {
		return Observable.create(observer => {
			this.socket.emit(eventName, data, (err, res) => {
				if (err) {
					observer.error(err);
				} else {
					observer.next(res);
				}
				observer.complete();
			});
		});
	}

	on(eventName: string) {
		return Observable.create(observer => {
			this.socket.on(eventName, (data, res) => {
				observer.next({ data, res });
			});
		});
	}

	subscribe(channelName: string) {
		return Observable.create(observer => {

			const watchHandler = data => {
				observer.next(data);
			}

			const channel = this.socket.subscribe(channelName);
			channel.watch(watchHandler);

			return () => {
				channel.unwatch(watchHandler);
				const channelWatchers = channel.watchers();

				// If no other watchers, destroy channel
				if (channelWatchers.length < 1) {
					channel.unsubscribe();
					channel.destroy();
				}
			};
		});
	}

}
