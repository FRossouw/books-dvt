import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchQuery: string;
  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void { }

  onChange(): void {
    if ((this.searchQuery == null) || (this.searchQuery == '') || (this.searchQuery == ' ') || (this.searchQuery == undefined)) {
      this.router.navigate([`/book`]);
    } else {
      this.router.navigate([`/book/search/${this.searchQuery}`]);
    }
    
  }

}
