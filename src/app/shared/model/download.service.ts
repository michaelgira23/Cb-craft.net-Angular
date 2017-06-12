import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';

import { SocketService } from './socket.service';

@Injectable()
export class DownloadService {

	private current: StatusData[] = [];
	currentDownloads: BehaviorSubject<StatusData[]> = new BehaviorSubject([]);

	constructor(private socketService: SocketService) {

		/** @todo Get initial download status if there are things currently being downloaded */

		this.socketService.subscribe('jars.status')
			.subscribe(
				status => {
					let alreadyExists = false;

					for (let i = 0; i < this.current.length; i++) {
						const download = this.current[i];
						if (download.origin === status.data.origin
							&& download.id === status.data.id
							&& download.version === status.data.version
						) {
							alreadyExists = true;

							if (status.action === 'progress') {
								download.progress = status.data.progress;
							} else if (status.action === 'complete') {
								this.current.splice(i--, 1);
							}
						}
					}

					if (!alreadyExists && status.action === 'progress') {
						this.current.push(status.data);
					}

					// Emit behavior subject
					this.currentDownloads.next(this.current);
				}
			);
	}

	download(origin: string, id: string) {
		return this.socketService.emit('jars.download', { origin, id })
			.filter(() => false)
			.concat(
				this.socketService.subscribe('jars.status')
			)
			.takeWhile(status => status.action !== 'complete')
			.map(status => status.data);
	}

}

interface Status {
	action: string;
	data: StatusData;
}

interface StatusData {
	origin: string;
	id: string;
	version: string;
	progress: Progress;
}

interface Progress {
	percent: number;
	speed: number;
	size: {
		total: number;
		transferred: number;
	};
	time: {
		elapsed: number;
		remaining: number
	};
}
