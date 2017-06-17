import { Injectable } from '@angular/core';

import { SocketService } from './socket.service';

@Injectable()
export class AdminService {

	constructor(private socketService: SocketService) { }

	canCreateAdmin() {
		return this.socketService.emit('admin.canCreateAdmin');
	}

	createUser(userInfo: UserInfo) {
		return this.socketService.emit('admin.createUser', userInfo);
	}

}

interface UserInfo {
	ign: string;
	name: string;
	password?: string;
	scopes: string[];
}
