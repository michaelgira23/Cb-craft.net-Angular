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

					console.log('Recieve new status', status);

					let updated = false;
					// for (const download of this.current) {
					for (let i = 0; i < this.current.length; i++) {
						const download = this.current[i];
						if (download.origin === status.data.origin
							&& download.id === status.data.id
							&& download.version === status.data.version
						) {
							if (status.action === 'progress') {
								download.progress = status.data.progress;
							} else if (status.action === 'complete') {
								this.current.splice(i--, 1);
							}

							updated = true;
						}
					}

					if (!updated && status.action === 'progress') {
						this.current.push(status);
					}

					// Emit behavior subject
					this.currentDownloads.next(this.current);
				}
			);
	}

	download(origin: string, id: string) {
		return this.socketService.emit('jars.download', { origin, id });
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
