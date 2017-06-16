import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectJarComponent } from './select-jar.component';

describe('SelectJarComponent', () => {
	let component: SelectJarComponent;
	let fixture: ComponentFixture<SelectJarComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SelectJarComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SelectJarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
