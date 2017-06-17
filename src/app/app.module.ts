import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { routing } from './routes';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

import { AdminComponent } from './pages/admin/admin.component';
import { ConfigureServerComponent } from './pages/configure-server/configure-server.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { CreateUserDialogComponent } from './pages/create-user/create-user-dialog/create-user-dialog.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { SelectJarComponent } from './pages/select-jar/select-jar.component';
import { ServerControlComponent } from './pages/server-control/server-control.component';
import { ServerListComponent } from './pages/server-list/server-list.component';

import { AdminService } from './shared/model/admin.service';
import { AuthService } from './shared/model/auth.service';
import { DownloadService } from './shared/model/download.service';
import { SearchService } from './shared/model/search.service';
import { SocketService } from './shared/model/socket.service';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		AdminComponent,
		ConfigureServerComponent,
		CreateUserComponent,
		CreateUserDialogComponent,
		DashboardComponent,
		LoginComponent,
		SearchComponent,
		SelectJarComponent,
		ServerControlComponent,
		ServerListComponent
	],
	entryComponents: [
		CreateUserDialogComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		routing
	],
	providers: [
		AdminService,
		AuthService,
		DownloadService,
		SearchService,
		SocketService
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
