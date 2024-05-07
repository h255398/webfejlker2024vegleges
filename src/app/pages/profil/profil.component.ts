import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit, OnChanges {
  user?: firebase.default.User;
  profil?: User;

  addKgForm: any;
  newWeight: any;


  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.addKgForm = this.fb.group({
      newWeight: ['', Validators.required],
      newEmail: ['', Validators.email]
    });
  }

  addWeight() {
    const newKg = this.addKgForm.value.newWeight;
    if (this.profil) {
      this.profil.kg.push(newKg);
      this.userService.update(this.profil);
      this.addKgForm.reset();
    }
  }

  ngOnChanges(): void {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(this.user?.uid) // hiba volt itt: this.user.uid
      .pipe(take(1))
      .subscribe((data) => {
        console.log(data);
        this.profil = data;
        this.addKgForm.patchValue({ newEmail: this.profil?.email });
      });
  }

  deleteWeight(i: number) {
    
    if (confirm('Biztosan törölni akarod ezt a súlyt?')) {
      console.log("asd")
      this.profil?.kg.splice(i, 1);
      console.log(this.profil)
      this.userService.update(this.profil!);
    }
  }
}
