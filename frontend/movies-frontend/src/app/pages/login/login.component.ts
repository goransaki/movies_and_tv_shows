import {Component, Injector, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public errorMessage = null;

  constructor(
    private inj: Injector,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toasterService: ToastrService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    const requestData = {
      username: this.loginForm.value['username'].trim(),
      password: this.loginForm.value['password'],
    };

    const userLogin = this.authService.login(requestData);
    userLogin.then(
      (response) => {
        if (response['status'] === 401) {
          this.errorMessage = 'Username and Password not found.';
          return;
        }
        this.router.navigate(['/home']);
      }
    );
  }
}
