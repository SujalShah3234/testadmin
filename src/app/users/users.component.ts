import { Component, OnInit, ViewChild } from '@angular/core';
import { users } from './users';
import { MatDialog } from '@angular/material/dialog';
import { UsersdataService } from './usersdata.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})

export class UsersComponent implements OnInit {
  animal: string;
  name: string;

  userarr: users[] = [];
  displayedColumns: string[] = ['select', 'u_name', 'u_mobileno', 'u_image', 'details', 'delete', 'edit'];
  dataSource: MatTableDataSource<users>;

  selection = new SelectionModel<users>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _data: UsersdataService, private _router: Router, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


  


  onDelete(item: users) {
    if (confirm("Are You Sure You Want To Delete ?")) {
      this._data.deleteUsers(item.u_email_id).subscribe(
        (data: any) => {
          console.log(data);
          this.userarr.splice(this.userarr.indexOf(item), 1);
          this.dataSource.data = this.userarr;
        }
      );
    }
  }

  OnUserEdit(item: users) {
    this._router.navigate(['/nav/edituser', item.u_email_id]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  ngOnInit() {
    this._data.getAllUsers().subscribe(
      (data: users[]) => {
        this.userarr = data;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }
}