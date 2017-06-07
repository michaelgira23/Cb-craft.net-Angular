import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs/Rx';

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
	unfilteredResults: Pack[] = [];
	results: Pack[] = [];
	tagCount: { [tag: string]: number } = {};
	tagFilter: any;
	private _tagFilter: { [tag: string]: boolean } = {};

	get tags() {
		return Object.keys(this.tagCount);
	}

	searchSubject: Subject<Query>;
	searchSubscription: Subscription;

	tagColorMap: { [tag: string]: string } = {
		vanilla: 'primary',
		modpack: 'primary',
		technic: 'accent',
		atlauncher: 'accent',
		default: 'warn'
	};

	constructor(private searchService: SearchService) { }

	ngOnInit() {
		this.searchSubject = new Subject();
		this.searchSubscription = this.searchSubject
			.distinctUntilChanged((a, b) => (a.origin === b.origin && a.string === b.string))
			.debounceTime(100)
			.flatMap(
				query => this.searchService.search(query)
					.catch(err => {
						/** @todo Display error message or something */
						return Observable.of([]);
					})
			)
			.subscribe(
				results => {
					console.log('Search Results', results);
					this.unfilteredResults = results;
					this.updateFilterTags();
				}
			);
		this.search();

		// Refilter results if tags filter changes
		this.tagFilter = new Proxy(this._tagFilter, {
			get: (target, name) => {
				return this._tagFilter[name];
			},
			set: (target, property, value, receiver) => {
				console.log('set new value!');
				this._tagFilter[property] = value;
				this.updateFilterTags();
				return true;
			}
		});
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

	updateFilterTags() {
		// Find how many times a tag is used
		this.tagCount = {};
		for (const pack of this.unfilteredResults) {
			for (const tag of pack.tags) {
				if (typeof this.tagCount[tag] === 'undefined') {
					this.tagCount[tag] = 0;
				} else {
					this.tagCount[tag]++;
				}
			}
		}

		// Add new tags to filter object
		for (const tag of Object.keys(this.tagCount)) {
			if (typeof this._tagFilter[tag] === 'undefined') {
				this._tagFilter[tag] = true;
			}
		}

		// If a tag no longer exists in filter, remove it
		for (const tag of Object.keys(this._tagFilter)) {
			if (typeof this.tagCount[tag] === 'undefined') {
				delete this.tagFilter[tag];
			}
		}

		// Update results
		this.results = [];
		for (const pack of this.unfilteredResults) {
			if (this.filterPack(pack)) {
				console.log('back is okay');
				this.results.push(pack);
			} else {
				console.log('back is not okay');
			}
		}
	}

	filterPack(pack: Pack) {
		return pack.tags.every(tag => this.tagFilter[tag]);
	}

}
