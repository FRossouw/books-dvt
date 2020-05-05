import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  picture: URL;
  constructor(public auth: AuthService) {
    this.picture = this.auth.userProfileData.picture;
  }

  ngOnInit() {
  }

}
