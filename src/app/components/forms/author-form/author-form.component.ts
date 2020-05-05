import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/app/models/author';
import { AuthorService } from 'src/app/services/author.service';
import { AuthorReturn } from 'src/app/models/author-return';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss']
})
export class AuthorFormComponent implements OnInit {

  form: FormGroup;
  update: boolean;
  author: Author;
  constructor(private activatedRoute: ActivatedRoute, private authorService: AuthorService, private router: Router) {
    this.form = new FormGroup({
      firstName: new FormControl('', {}),
      middleName: new FormControl('', {}),
      lastName: new FormControl('', {}),
      about: new FormControl('', {})
    });
    this.author = {} as Author;
  }

  ngOnInit(): void {
    let authorId: string;
    this.update = false;
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('id')) {
        authorId = params.get('id');
        this.update = true;
        this.getAuthor(authorId);
      }
    });

    this.firstName.valueChanges.subscribe(x => this.author.first_name = x);
    this.middleName.valueChanges.subscribe(x => this.author.middle_names = x);
    this.lastName.valueChanges.subscribe(x => this.author.last_name = x);
    this.about.valueChanges.subscribe(x => this.author.about = x);

  }

  get firstName(): AbstractControl { return this.form.get('firstName'); }
  get middleName(): AbstractControl { return this.form.get('middleName'); }
  get lastName(): AbstractControl { return this.form.get('lastName'); }
  get about(): AbstractControl { return this.form.get('about'); }

  saveForm(): void {
    if (this.update) {
      this.updateAuthor();
    } else {
      this.addAuthor();
    }
  }

  private getAuthor(authorId: string): void {
    this.author = new Author();
    this.authorService.getAuthor(authorId).subscribe((authorX) => {
      this.author = authorX;
    });
  }

  private addAuthor(): void {
    let authorReturn = {} as AuthorReturn;
    this.authorService.createAuthor(this.author).subscribe(authorR => {
      authorReturn = authorR;
      this.router.navigate([`/author/view/${authorReturn.id}`]);
    });
  }

  private updateAuthor(): void {
    this.authorService.updateAuthor(this.author).subscribe(() => {
      this.router.navigate([`/author/view/${this.author.id}`]);
    });
  }

}
