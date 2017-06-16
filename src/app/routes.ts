import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateServerComponent } from './pages/create-server/create-server.component';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { ServerControlComponent } from './pages/server-control/server-control.component';
import { ServerListComponent } from './pages/server-list/server-list.component';

const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/dashboard',
		pathMatch: 'full'
	},
	{
		path: 'dashboard',
		component: DashboardComponent
	},
	{
		path: 'create',
		component: CreateServerComponent
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'search',
		component: SearchComponent
	},
	{
		path: 'servers',
		component: ServerListComponent
	},
	{
		path: 'server',
		children: [
			{
				path: '',
				component: ServerControlComponent
			}
		]
	},
	{
		path: '**',
		redirectTo: '/dashboard'
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
