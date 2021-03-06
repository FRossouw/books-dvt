import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/features/feature-author/services/author.service';
import { Author } from 'src/app/features/feature-author/models/author';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  authors: Author[] = new Array();

  constructor(public authorService: AuthorService) { }

  ngOnInit(): void {
    this.getAuthors();
  }

  private getAuthors(): void {
    this.authors = new Array();
    this.authorService.getAuthors().subscribe((authorX) => {
      authorX.forEach((authorFE) => {
        this.authors.push(authorFE);
      });
    });

  }

}
