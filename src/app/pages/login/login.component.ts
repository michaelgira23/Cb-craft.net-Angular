import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../shared/model/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	submitting = false;
	error = null;
	loginForm: FormGroup;

	constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

	ngOnInit() {
		this.loginForm = this.fb.group({
			ign: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	login() {
		this.submitting = true;
		this.authService.login(this.loginForm.value)
			.subscribe(
				() => {
					this.router.navigate(['/dashboard']);
					this.submitting = false;
				},
				err => {
					this.error = err;
					this.submitting = false;
				}
			);
	}

}
