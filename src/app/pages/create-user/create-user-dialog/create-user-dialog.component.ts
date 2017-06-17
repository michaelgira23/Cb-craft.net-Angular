import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import Clipboard from 'clipboard';

import { CreatedUser } from '../../../shared/model/admin.service';

@Component({
	selector: 'app-create-user-dialog',
	templateUrl: './create-user-dialog.component.html',
	styleUrls: ['./create-user-dialog.component.scss']
})
export class CreateUserDialogComponent implements OnInit, OnDestroy {

	user: CreatedUser = null;
	@ViewChild('passwordCopy', { read: ElementRef }) passwordCopy: ElementRef;
	passwordClipboard: Clipboard;

	constructor(private router: Router) { }

	ngOnInit() {
		this.passwordClipboard = new Clipboard(this.passwordCopy.nativeElement, {
			text: () => this.user.password
		});

		this.passwordClipboard.on('success', event => {
			console.log('Copy Success!', event);
		});

		this.passwordClipboard.on('error', event => {
			console.log('Copy Fail!', event);
		});
	}

	ngOnDestroy() {
		this.passwordClipboard.destroy();
	}

}
