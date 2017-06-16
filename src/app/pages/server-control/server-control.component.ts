import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import Clipboard from 'clipboard';

@Component({
	selector: 'app-server-control',
	templateUrl: './server-control.component.html',
	styleUrls: ['./server-control.component.scss']
})
export class ServerControlComponent implements OnInit, OnDestroy {

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
		this.ipClipboard = new Clipboard(this.ipCopy.nativeElement, {
			text: () => this.ip
		});

		this.ipClipboard.on('success', event => {
			console.log('Copy Success!', event);
		});

		this.ipClipboard.on('error', event => {
			console.log('Copy Fail!', event);
		});
	}

	ngOnDestroy() {
		this.ipClipboard.destroy();
	}

	sendCommand(inputElem: HTMLInputElement) {
		const command = inputElem.value;

		if (command.length < 1) {
			return;
		}

		console.log('send command', command);

		// Clear input upon successful completion
		inputElem.value = '';
	}

}
