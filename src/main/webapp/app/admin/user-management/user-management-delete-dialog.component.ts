import { Component } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';

import { User } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'jhi-user-mgmt-delete-dialog',
  templateUrl: './user-management-delete-dialog.component.html'
})
export class UserManagementDeleteDialogComponent {
  users!: User[];

  constructor(private userService: UserService, public activeModal: MatDialog, private eventManager: JhiEventManager) {}

  getLoginList(): String[] {
    return this.users.map(user => user.login!);
  }
}
