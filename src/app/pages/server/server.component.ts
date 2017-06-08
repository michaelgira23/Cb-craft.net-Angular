import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import Clipboard from 'clipboard';

@Component({
	selector: 'app-server',
	templateUrl: './server.component.html',
	styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit, OnDestroy {

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

	ip = 'mc.cb-craft.net';
	@ViewChild('ipCopy', { read: ElementRef }) ipCopy: ElementRef;
	ipClipboard: Clipboard;

	constructor() { }

	ngOnInit() {
		console.log('elemen', this.ipCopy);
		this.ipClipboard = new Clipboard(this.ipCopy.nativeElement, {
			text: () => this.ip
		});

		this.ipClipboard.on('success', event => {
			console.log('Success!', event);
		});

		this.ipClipboard.on('error', event => {
			console.log('Fail!', event);
		});
	}

	ngOnDestroy() {
		this.ipClipboard.destroy();
	}

}
