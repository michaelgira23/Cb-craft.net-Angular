import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-configure-server',
	templateUrl: './configure-server.component.html',
	styleUrls: ['./configure-server.component.scss']
})
export class ConfigureServerComponent implements OnInit {

	// Allowed memory options (in GB)
	memoryAmounts = [ 1, 2, 3, 4 ];

	constructor() { }

	ngOnInit() {
	}

}
