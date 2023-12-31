import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!:FormGroup
  constructor(private formBuilder:FormBuilder, private http:HttpClient, private router:Router){

  }
  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      password:['']
    })
  }
  //make method to create user
  signUp(){
  this.http.post<any>("http://localhost:3000/signup",this.signupForm.value).subscribe(res=>{
    alert("Registration successful");
    this.signupForm.reset();
    this.router.navigate(['login'])
  },err=>{
    alert("Failed to Register, Try again")
  })
}
}
