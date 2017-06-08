import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SearchComponent } from './pages/search/search.component';
import { ServerComponent } from './pages/server/server.component';

const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/dashboard',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'dashboard',
		component: DashboardComponent
	},
	{
		path: 'search',
		component: SearchComponent
	},
	{
		path: 'server',
		component: ServerComponent
	},
	{
		path: '**',
		redirectTo: '/dashboard'
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
