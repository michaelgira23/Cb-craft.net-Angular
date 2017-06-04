import { Component, OnInit } from '@angular/core';

import { AuthService, JWT } from '../model/auth.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	jwt: JWT;

	constructor(private authService: AuthService) { }

	ngOnInit() {
		this.authService.$auth.subscribe(
			jwt => this.jwt = jwt
		);
	}

}
