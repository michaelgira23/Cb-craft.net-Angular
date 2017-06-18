import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';

import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';

import { AdminService, CreatedUser } from '../../shared/model/admin.service';

@Component({
	selector: 'app-create-user',
	templateUrl: './create-user.component.html',
	styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit, OnDestroy {

	availableScopes = [
		'admin',
		'moderator'
	];

	initialAdmin: boolean = null;

	submitting = false;
	error = null;
	createUserForm: FormGroup;

	dialogRef: MdDialogRef<CreateUserDialogComponent>;

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private dialog: MdDialog,
		private adminService: AdminService
	) { }

	ngOnInit() {
		this.route.queryParams.subscribe(
			params => {
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

	ngOnDestroy() {
		this.closeModal();
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

		this.adminService.createUser(user)
			.subscribe(
				createdUser => {
					this.submitting = false;

					if (this.initialAdmin) {
						this.router.navigate(['/login']);
					} else {
						this.openModal(createdUser);
					}
				},
				err => {
					this.error = err;
					this.submitting = false;
				}
			);
	}

	openModal(user: CreatedUser) {
		if (!this.dialogRef) {
			this.dialogRef = this.dialog.open(CreateUserDialogComponent);
			this.dialogRef.componentInstance.user = user;
		}
	}

	closeModal() {
		if (this.dialogRef) {
			this.dialogRef.close();
		}
	}

}
