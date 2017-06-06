import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as fuse from 'fuse.js';
import { Pack } from './pack';

import { SocketService } from './socket.service';

@Injectable()
export class SearchService {

	vanillaCache: Pack[];


	constructor(private socketService: SocketService) { }

	search(query: Query): Observable<Pack[]> {
		console.log('search', query);
		switch (query.origin) {
			case 'vanilla':
				return this.searchVanilla(query.string);
			case 'technic':
				return this.searchTechnic(query.string);
			case 'atlauncher':
				return this.searchATLauncher(query.string);
			default:
				return Observable.throw(`Unknown origin "${query.origin}"!`);
		}
	}

	searchVanilla(query: string) {
		// const base = Observable.of();
		//
		// // If we don't have cache yet, get list of vanilla versions
		// console.log('vanila cache', this.vanillaCache);
		// if (!this.vanillaCache) {
		// 	console.log('concat');
		// 	base.map(
		// 		() => this.socketService.emit('search', query)
		// 	)
		// 	.map(packs => {
		// 		console.log('get vanilla packs', packs);
		// 		this.vanillaCache = packs;
		// 	});
		// }
		//
		// base.concat(() => {
		// 	console.log('return cache', this.vanillaCache);
		// 	return this.vanillaCache;
		// });
		//
		// // base.map();

		// return Observable.of([]);

		return this.socketService.emit('search', query);
	}

	searchTechnic(query: string) {
		return Observable.of([]);
	}

	searchATLauncher(query: string) {
		return Observable.of([]);
	}

	fuzzy() {

	}

}

export interface Query {
	origin: string;
	string: string;
}
