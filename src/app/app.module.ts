import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { routing } from './routes';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SearchComponent } from './pages/search/search.component';

import { SocketService } from './socket.service';

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
		ReactiveFormsModule,
		MaterialModule,
		routing
	],
	providers: [
		SocketService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
