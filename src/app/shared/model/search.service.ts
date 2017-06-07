import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as Fuse from 'fuse.js';
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
		// If no cache, query Minecraft versions
		let source;
		if (this.vanillaCache) {
			source = Observable.of(this.vanillaCache);
		} else {
			source = this.socketService.emit('search', { origin: 'vanilla', query })
				.do(packs => {
					this.vanillaCache = packs
				});
		}

		return source
			.switchMap(packs => {
				// If no query, just return packs without fuzzy search
				if (query.length === 0) {
					return Observable.of(packs);
				} else {
					return this.fuzzy(query, packs)
				}
			});
	}

	searchTechnic(query: string) {
		return this.socketService.emit('search', { origin: 'technic', query });
	}

	searchATLauncher(query: string) {
		return Observable.of([]);
	}

	fuzzy(query: string, list: Pack[]) {
		return Observable.create(observer => {
			const fuse = new Fuse(list, {
				shouldSort: true,
				threshold: 0.6,
				location: 0,
				distance: 100,
				maxPatternLength: 32,
				minMatchCharLength: 1,
				keys: [
					'id',
					'name',
					'tags'
				]
			});
			observer.next(fuse.search(query));
			observer.complete();
		});
	}

}

export interface Query {
	origin: string;
	string: string;
}
