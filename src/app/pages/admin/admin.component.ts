import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AdminService } from '../../shared/model/admin.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

	constructor(private router: Router, private adminService: AdminService) { }

	ngOnInit() {
		this.adminService.canCreateAdmin()
			.subscribe(
				createInitialAdmin => {
					console.log('Able to create initial admin?', createInitialAdmin);
					if (createInitialAdmin) {
						this.router.navigate(['/create-user'], { queryParams: { initialAdmin: true } });
					}
				},
				err => {
					console.log('Error check if we should create initial admin user!', err);
				}
			);
	}

}
