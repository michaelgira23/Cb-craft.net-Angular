import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { AuthService, JWT } from '../model/auth.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	jwt: JWT;

	constructor(private snackBar: MdSnackBar, private authService: AuthService) { }

	ngOnInit() {
		this.authService.$auth.subscribe(
			jwt => this.jwt = jwt
		);
	}

	logout() {
		this.authService.logout()
			.subscribe(
				() => {},
				err => {
					this.snackBar.open('Error logging out', 'Dismiss', {
						duration: 3000
					});
				}
			);
	}

}
