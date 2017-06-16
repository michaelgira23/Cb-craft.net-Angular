import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureServerComponent } from './configure-server.component';

describe('ConfigureServerComponent', () => {
	let component: ConfigureServerComponent;
	let fixture: ComponentFixture<ConfigureServerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ConfigureServerComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ConfigureServerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
