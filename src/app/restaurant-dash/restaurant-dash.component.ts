import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RestaurantData } from './restaurant.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css'],
})
export class RestaurantDashComponent implements OnInit {
  formValue!: FormGroup;
  restaurantModelObj: RestaurantData = new RestaurantData();
  allRestaurantData: any;
  showAdd!:boolean;
  showBtn!:boolean;


  constructor(private formBuilder: FormBuilder, private api: ApiService) {}
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: [''],
    });
    this.getAllData();
  }
  clickaddData(){
    this.formValue.reset();
    this.showAdd=true;
    this.showBtn=false;
  }
  //subscribing data which is maped via services
  addData() {
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;

    this.api.postMethod(this.restaurantModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('Records added successfully');
        //clear fill form data 0
        let ref = document.getElementById('clear');
        ref?.click();
        this.formValue.reset();
        this.getAllData(); //refresh after create new entry
      },
      (err) => {
        alert('Failed Try again');
      }
    );
  }
  //get all data
  getAllData() {
    this.api.getMethod().subscribe((res) => {
      this.allRestaurantData = res;
    });
  }

  //delete entry
  deleteData(data: any) {
    this.api.deleteMethod(data.id).subscribe((res) => {
      alert('Record Deleted successfully');
      this.getAllData(); //quick refresh
    });
  }
  //edit data
  editData(data: any) {

    this.showAdd=false;
    this.showBtn=true;

    this.restaurantModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }
  updateData() {
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;

    this.api
      .updateMethod(this.restaurantModelObj, this.restaurantModelObj.id)
      .subscribe((res) => {
        alert('Data successfully updated');
        //clear form data 0
        let ref = document.getElementById('clear');
        ref?.click();
        this.formValue.reset();
        this.getAllData(); //refresh after every update
      });
  }
}
