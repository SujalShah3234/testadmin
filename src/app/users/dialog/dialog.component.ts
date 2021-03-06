import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment.prod';
import { users } from '../users';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: users
  ) { }

  user_image: string;
  user_email: string;
  user_name: string;
  user_phone: string;
  user_address: string = "Address is not provided by user yet.";
  url: string = environment.db;

  ngOnInit() {
    this.user_image = this.data.u_image;
    this.user_email = this.data.u_email_id;
    this.user_name = this.data.u_name;
    this.user_phone = this.data.u_mobileno;
    this.user_address = this.data.u_address;
  }

  onClose() {
    this.dialogRef.close();
  }
}
