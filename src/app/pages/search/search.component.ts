import { Component, OnInit } from '@angular/core';

import { SocketService } from '../../socket.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

	constructor(private socketService: SocketService) { }

	ngOnInit() {
	}

}
