import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs/Rx';

import { Pack } from '../../shared/model/pack';
import { SearchService, Query } from '../../shared/model/search.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

	queryString = '';
	origin = 'vanilla';
	results: Pack[] = [];

	searchSubject: Subject<Query>;
	searchSubscription: Subscription;

	constructor(private searchService: SearchService) { }

	ngOnInit() {
		this.searchSubject = new Subject();
		this.searchSubscription = this.searchSubject
			.distinctUntilChanged((a, b) => (a.origin === b.origin && a.string === b.string))
			.debounceTime(100)
			.switchMap(query => this.searchService.search(query))
			.subscribe(
				results => {
					console.log('Search Results', results);
					this.results = results;
				}
			);
		this.search();
	}

	ngOnDestroy() {
		this.searchSubscription.unsubscribe();
	}

	search() {
		this.searchSubject.next({
			origin: this.origin,
			string: this.queryString
		});
	}

}
