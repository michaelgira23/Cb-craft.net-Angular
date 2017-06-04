import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SocketService } from '../../socket.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	submitting = false;
	error = null;
	loginForm: FormGroup;

	constructor(private fb: FormBuilder, private router: Router, private socketService: SocketService) { }

	ngOnInit() {
		this.loginForm = this.fb.group({
			ign: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	login() {
		this.submitting = true;
		this.socketService.emit('login', this.loginForm.value, err => {
			this.submitting = false;
			if (err) {
				this.error = err;
			} else {
				this.router.navigate(['/dashboard']);
			}
		});
	}

}
