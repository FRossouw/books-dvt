import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';
import { Author } from 'src/app/models/author';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  authors: Author[] = new Array();

  constructor(private authorService: AuthorService) { }

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
