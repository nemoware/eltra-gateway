import { Component, OnInit, ViewChild } from '@angular/core';

import { GatewayRoutesService } from './gateway-routes.service';
import { GatewayRoute } from './gateway-route.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';

@Component({
  selector: 'jhi-gateway',
  templateUrl: './gateway.component.html',
  providers: [GatewayRoutesService]
})
export class GatewayComponent implements OnInit {
  gatewayRoutes: GatewayRoute[] = [];
  updatingRoutes = false;
  displayedColumns: string[] = ['path', 'serviceId', 'server'];
  dataSource = new MatTableDataSource(this.gatewayRoutes);

  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort();

  constructor(private gatewayRoutesService: GatewayRoutesService) {}

  ngOnInit(): void {
    this.refresh();
    this.sort.sort({ id: 'serviceId', start: 'asc' } as MatSortable);
    this.dataSource.sort = this.sort;
  }

  refresh(): void {
    this.updatingRoutes = true;
    this.gatewayRoutesService.findAll().subscribe(gatewayRoutes => {
      this.gatewayRoutes = gatewayRoutes;
      this.dataSource = new MatTableDataSource(this.gatewayRoutes);
      this.updatingRoutes = false;
    });
  }
}
