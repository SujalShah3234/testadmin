import { Component, OnInit, Inject } from '@angular/core';
import { product } from '../product';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductdataService } from '../productdata.service';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-view-more-product',
  templateUrl: './view-more-product.component.html',
  styleUrls: ['./view-more-product.component.css']
})
export class ViewMoreProductComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ViewMoreProductComponent>, @Inject(MAT_DIALOG_DATA) public data: product, public _product_ser: ProductdataService) { }

  product_id: number;
  product_name: string;
  product_mfg: string;
  product_price: string;
  product_desc: string;
  image_arr: string[] = [];
  i: number;
  url: string = environment.db;

  ngOnInit() {
    this.product_id = this.data.pro_id;
    this.product_name = this.data.pro_name;
    this.product_mfg = this.data.pro_mfg;
    this.product_price = this.data.pro_price;
    this.product_desc = this.data.pro_desc;
    this._product_ser.getProductPhoto(this.product_id).subscribe(
      (data: any[]) => {
        for (this.i = 0; this.i < data.length; this.i++) {
          this.image_arr.push(data[this.i].pro_photo);
        }
      }
    );
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}