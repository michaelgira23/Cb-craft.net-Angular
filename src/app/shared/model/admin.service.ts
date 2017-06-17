import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { SocketService } from './socket.service';

@Injectable()
export class AdminService {

	constructor(private socketService: SocketService) { }

	canCreateAdmin() {
		return this.socketService.emit('admin.canCreateAdmin');
	}

	createUser(userInfo: UserInfo): Observable<CreatedUser> {
		return this.socketService.emit('admin.createUser', userInfo);
	}

}

export interface CreatedUser {
	ign: string;
	name: string;
	password: string;
}

interface UserInfo {
	ign: string;
	name: string;
	password?: string;
	scopes: string[];
}
