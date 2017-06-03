import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule } from '@angular/material';
import 'hammerjs';

import { routing } from './routes';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SearchComponent } from './pages/search/search.component';

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
		MdButtonModule,
		routing
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
