import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  formModel = {
    Email: '',
    Password: ''
  }

  logingin : boolean = false;
  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('typeid') != null)
      this.router.navigateByUrl('/home');
  }

  onSubmit(form: NgForm)  {
    this.logingin = true;
    this.service.login(form.value).subscribe(
      (res: any) => {
        if (res.succeeded) {
         
          localStorage.setItem('typeid', res.typeid);
          localStorage.setItem('username', res.username);
          this.router.navigateByUrl('/home');
        } else {
          
          this.toastr.error(res.message);
          this.logingin = false;
        }
      },
      err => {
        console.log(err);
        this.logingin = false;
      }
    );
  }


}
