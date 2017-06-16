import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './pages/admin/admin.component';
import { ConfigureServerComponent } from './pages/configure-server/configure-server.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { SelectJarComponent } from './pages/select-jar/select-jar.component';
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
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'admin',
		component: AdminComponent
	},
	{
		path: 'servers',
		component: ServerListComponent
	},
	{
		path: 'select',
		component: SelectJarComponent
	},
	{
		path: 'search',
		component: SearchComponent
	},
	{
		path: 'create',
		children: [
			{
				path: ':origin/:id',
				component: ConfigureServerComponent,
				data: {
					mode: 'create'
				}
			},
			{
				path: '**',
				redirectTo: '/select'
			}
		]
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
