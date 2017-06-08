import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-server',
	templateUrl: './server.component.html',
	styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {

	onlinePlayers = [
		{
			ign: 'Ccoolboy',
			name: 'Michael',
			isOp: true
		},
		{
			ign: 'Numbah47',
			name: 'Michael',
			isOp: false
		},
		{
			ign: 'nmell19',
			name: 'Michael',
			isOp: false
		},
		{
			ign: 'ccoolgirl',
			name: 'Michael',
			isOp: false
		}
	];

	constructor() { }

	ngOnInit() {
	}

}
