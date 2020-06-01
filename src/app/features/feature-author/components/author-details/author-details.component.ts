import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/features/feature-author/services/author.service';
import { ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/features/feature-author/models/author';
import { AuthService } from 'src/app/features/feature-authorization/services/auth.service';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss']
})
export class AuthorDetailsComponent implements OnInit {

  author: Author;
  admin: boolean;
  constructor(private activatedRoute: ActivatedRoute, private authorService: AuthorService, private auth: AuthService) {
    this.admin = false;
    this.admin = auth.admin;
  }

  ngOnInit(): void {
    let authorId: string;
    this.activatedRoute.paramMap.subscribe(params => {
      authorId = params.get('id');
      this.getAuthor(authorId);
    });

  }

  getAuthor(authorId: string): void {
    this.author = new Author();
    this.authorService.getAuthor(authorId).subscribe((authorX) => {
      this.author = authorX;
    });
  }

}
