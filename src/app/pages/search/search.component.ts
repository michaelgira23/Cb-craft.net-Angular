import { Component, OnInit } from '@angular/core';
import * as fuse from 'fuse.js';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

	searchString = '';
	origin = 'vanilla';

	constructor() { }

	ngOnInit() {
		console.log(fuse);
	}

}
