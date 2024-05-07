import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {take} from "rxjs";
import {User} from "../../shared/models/User";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit{

  weightStr='';

  constructor(private afAuth: AngularFireAuth,private userservice: UserService, private cd: ChangeDetectorRef) {}
  
  user?: firebase.default.User | null;
  profil?: User;
  kg: any;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userservice.getById(this.user?.uid) // hiba volt itt: this.user.uid
      .pipe(take(1))
      .subscribe((data) => {
        console.log(data);
        this.profil = data;
        this.kg = data?.kg;
        this.weightStr = this.getWeightData([...data?.kg as Array<string>]);
      });
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  getWeightData(kgArray: Array<string>): string {
    
    if(kgArray.length === 1)
    {
        return `${kgArray.pop()} kg`;
    }
    console.log(kgArray)
    
    const tempArray:string[]=[...kgArray.reverse() as string[]]
    const delta = +tempArray[0] - +tempArray[1];
    console.log(tempArray[0])
    console.log(tempArray[1])
    
    return delta>0?`${delta} kg-t hízott`:delta<0?`${delta} kg-t fogyott`:`${kgArray[1]} kg a jelenlegi súlyod`
  }
}
