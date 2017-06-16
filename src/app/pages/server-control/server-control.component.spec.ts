import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerControlComponent } from './server-control.component';

describe('ServerControlComponent', () => {
	let component: ServerControlComponent;
	let fixture: ComponentFixture<ServerControlComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ServerControlComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ServerControlComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
