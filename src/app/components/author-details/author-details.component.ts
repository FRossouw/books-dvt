import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';
import { ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/models/author';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss']
})
export class AuthorDetailsComponent implements OnInit {

  author: Author;

  constructor(private activatedRoute: ActivatedRoute, private authorService: AuthorService) { }

  ngOnInit(): void {
    let authorId: string;
    this.activatedRoute.paramMap.subscribe(params => {
      authorId = params.get('id');
    });

    this.getAuthor(authorId);
  }

  private getAuthor(authorId: string): void {
    this.author = new Author();
    this.authorService.getAuthor(authorId).subscribe((authorX) => {
      this.author = authorX;
    });
  }

}
