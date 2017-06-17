import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AdminService } from '../../shared/model/admin.service';

@Component({
	selector: 'app-create-user',
	templateUrl: './create-user.component.html',
	styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

	availableScopes = [
		'admin',
		'moderator'
	];

	initialAdmin: boolean = null;

	submitting = false;
	error = null;
	createUserForm: FormGroup;

	constructor(private fb: FormBuilder, private route: ActivatedRoute, private adminService: AdminService) { }

	ngOnInit() {
		this.route.queryParams.subscribe(
			params => {
				console.log('Initial admin?', !!params.initialAdmin);
				this.initialAdmin = !!params.initialAdmin;
			}
		);

		const scopesArray = new Array(this.availableScopes.length).fill(false);

		if (this.initialAdmin) {
			scopesArray[0] = true;
		}

		this.createUserForm = this.fb.group({
			ign: ['', Validators.required],
			name: ['', Validators.required],
			password: '',
			scopes: this.fb.array(scopesArray)
		});
	}

	createUser() {
		this.submitting = true;

		const user = JSON.parse(JSON.stringify(this.createUserForm.value));
		// Convert booleans into actual strings
		const scopes = [];
		for (let i = 0; i < this.createUserForm.value.scopes.length; i++) {
			const scope = this.createUserForm.value.scopes[i];
			if (scope) {
				scopes.push(this.availableScopes[i]);
			}
		}
		user.scopes = scopes;

		console.log('Create user!', user, this.createUserForm.value);

		this.adminService.createUser(user)
			.subscribe(
				user => {
					console.log('Successfully created user!', user);
					this.submitting = false;
				},
				err => {
					this.error = err;
					console.log('Error creating user!', err);
					this.submitting = false;
				}
			);
	}

}
