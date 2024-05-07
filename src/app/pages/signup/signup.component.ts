import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
   // email: new FormControl(''),
   email: new FormControl('', [Validators.required, Validators.email]),
   /* password: new FormControl(''),
    rePassword: new FormControl(''),
    nev: new FormControl(''),
    kg: new FormControl('')*/
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
   // rePassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    nev: new FormControl('', Validators.required),
    kg: new FormControl('', Validators.required),
  });
  progressValue: number | undefined;
  submitting: boolean | undefined;
//termsAccepted: any;

constructor(
  private location: Location,
  private authService: AuthService,
  private userService: UserService,
  private router: Router,
  private _snackBar: MatSnackBar
) {
}

  ngOnInit(): void {
   
  }

 /* onSubmit() {
    console.log(this.signUpForm.value);
    this.authService.signup(this.signUpForm.get('email')?.value as string, this.signUpForm.get('password')?.value as string).then(cred => {
      console.log(cred);
      const user: User = {
        id: cred.user?.uid as string,
        email: this.signUpForm.get('email')?.value as string,
        nev: this.signUpForm.get('nev')?.value as string,
        kg : this.signUpForm.get('kg')?.value as unknown as string[],
      };
      this.userService.create(user).then(_ => {
        console.log('User added successfully.');
      }).catch(error => {
        console.error(error);
      })
    }).catch(error => {
      console.error(error);
    });
  }*/
  onSubmit() {
    console.log(this.signUpForm.value);
    this.submitting = true;
    console.log(this.signUpForm.value);
    const email = this.signUpForm.get('email')?.value as string;
    const nev = this.signUpForm.get('nev')?.value as string;
    const kg = this.signUpForm.get('kg')?.value as string;

    const user: User = {
      id: '',
      email: email,
      nev: nev,
      kg: [kg],

    };
    console.log(this.signUpForm);
    if (this.signUpForm.valid) {
      console.log("asd")
      this.authService
        .signup(email, this.signUpForm.get('password')?.value as string)
        .then((cred) => {
          console.log(cred);
          user.id = cred.user?.uid as string;

          // Átalakítás JSON objektummá
          const userObj = JSON.parse(JSON.stringify(user));

          // Feltöltés Firebase adatbázisába
          this.userService.create(userObj)
            .then(() => {
              this._snackBar.open('Sikeres regisztáció!', 'Ok', {
                duration: 3000,
              });

              console.log('User added successfully');
              this.submitting = false;
              this.router.navigateByUrl('/main');
            })
            .catch((error) => {
              alert('Nem sikeres regisztáció!');
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });


    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  goBack() {
    this.location.back();
  }

}
