import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-select-jar',
	templateUrl: './select-jar.component.html',
	styleUrls: ['./select-jar.component.scss']
})
export class SelectJarComponent implements OnInit {

	favorites: Favorite[] = [
		{
			name: 'Vanilla',
			logo: 'http://cdn.technicpack.net/platform2/pack-logos/552561.png?1443082717',
			background: 'http://cdn.technicpack.net/platform2/pack-backgrounds/552561.jpg?1443082717',
			origin: 'vanilla',
			id: 'latest'
		},
		{
			name: 'Cbcraft Modpack',
			background: 'http://cdn.technicpack.net/platform2/pack-backgrounds/667966.jpg?1495753691',
			origin: 'technic',
			id: 'cbcraft-modpack'
		},
		{
			name: 'Attack of the B-Team',
			logo: 'http://cdn.technicpack.net/platform2/pack-logos/552556.png?1445088955',
			background: 'http://cdn.technicpack.net/platform2/pack-backgrounds/552556.jpg?1445088955',
			origin: 'technic',
			id: 'attack-of-the-bteam'
		}
	];

	constructor() { }

	ngOnInit() {
	}

}

interface Favorite {
	name: string;
	logo?: string;
	background: string;
	origin: string;
	id: string;
}
