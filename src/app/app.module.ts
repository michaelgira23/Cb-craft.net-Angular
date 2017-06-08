import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { routing } from './routes';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SearchComponent } from './pages/search/search.component';

import { AuthService } from './shared/model/auth.service';
import { DownloadService } from './shared/model/download.service';
import { SearchService } from './shared/model/search.service';
import { SocketService } from './shared/model/socket.service';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		LoginComponent,
		DashboardComponent,
		SearchComponent
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
		AuthService,
		DownloadService,
		SearchService,
		SocketService
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
