import { Component, Input, OnInit } from '@angular/core';
import { PublicUser } from 'src/app/core/interfaces/public-user.interface';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  @Input() public userData: PublicUser;
  public isLoading: boolean = true;

  constructor( ) { }

  public ngOnInit(): void {
    this.isLoading = true;
  }

  public ngAfterViewInit(): void {
    this.userData ? this.isLoading = false : this.isLoading = true;
  }
}