import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.model';
import { UserManagementDeleteDialogComponent } from './user-management-delete-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'jhi-user-mgmt',
  templateUrl: './user-management.component.html'
})
export class UserManagementComponent implements OnInit, OnDestroy, AfterViewInit {
  currentAccount: Account | null = null;
  users: User[] | null = null;
  userListSubscription?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  previousPage!: number;
  displayedColumns: string[] = [
    'select',
    'id',
    'login',
    'email',
    'activated',
    'langKey',
    'profiles',
    'createdDate',
    'lastModifiedBy',
    'lastModifiedDate'
  ];

  selection = new SelectionModel<User>(true, []);
  @ViewChild(MatSort, { static: false }) sortColumn: MatSort | null = null;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | null = null;
  isLoadingResults = true;

  constructor(
    private userService: UserService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventManager: JhiEventManager,
    private modalService: MatDialog
  ) {}

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.users == null ? 0 : this.users.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else if (this.users) {
      this.users.forEach(row => this.selection.select(row));
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.sortColumn!.sortChange.subscribe(() => (this.paginator!.pageIndex = 0));
    this.activatedRoute.data
      .pipe(
        flatMap(
          () => this.accountService.identity(),
          (data, account) => {
            this.previousPage = data.pagingParams.page;
            this.currentAccount = account;
            this.loadAll();
            this.userListSubscription = this.eventManager.subscribe('userListModification', () => this.loadAll());
          }
        )
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.userListSubscription) {
      this.eventManager.destroy(this.userListSubscription);
    }
  }

  setActive(event: Event, user: User, isActivated: boolean): void {
    event.stopPropagation();
    if (this.currentAccount!.login !== user.login) {
      this.userService.update({ ...user, activated: isActivated }).subscribe(() => this.loadAll());
    }
  }

  trackIdentity(index: number, item: User): any {
    return item.id;
  }

  loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition(): void {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        page: this.paginator!.pageIndex,
        sort: this.sortColumn!.active + ',' + this.sortColumn!.direction
      }
    });
    this.loadAll();
  }

  isDeleteButtonDisabled(): boolean {
    if (this.selection.selected.length === 0) {
      return true;
    }
    if (this.currentAccount && this.users) {
      return this.selection.isSelected(this.users.find(user => user.login === this.currentAccount!.login) as User);
    } else {
      return true;
    }
  }

  deleteSelectedUsers(): void {
    const modalRef = this.modalService.open(UserManagementDeleteDialogComponent);
    modalRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.delete(modalRef.componentInstance.users.map(user => user.login!)).subscribe(() => {
          this.eventManager.broadcast('userListModification');
        });
      }
    });
    modalRef.componentInstance.users = this.selection.selected;
  }

  private loadAll(): void {
    this.isLoadingResults = true;
    this.userService
      .query({
        page: this.paginator!.pageIndex,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<User[]>) => this.onSuccess(res.body, res.headers));
  }

  private sort(): string[] {
    if (!this.sortColumn || !this.sortColumn.active) {
      return [];
    }
    const result = [this.sortColumn.active + ',' + this.sortColumn.direction];
    if (this.sortColumn.active !== 'id') {
      result.push('id');
    }
    return result;
  }

  private onSuccess(users: User[] | null, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.users = users;
    this.isLoadingResults = false;
  }
}
