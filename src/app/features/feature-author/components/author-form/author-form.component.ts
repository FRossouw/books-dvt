import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/app/features/feature-author/models/author';
import { AuthorService } from 'src/app/features/feature-author/services/author.service';
import { AuthorReturn } from 'src/app/features/feature-author/models/author-return';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss']
})
export class AuthorFormComponent implements OnInit {

  form: FormGroup;
  update: boolean;
  author: Author;
  authorReturn: AuthorReturn;
  constructor(private activatedRoute: ActivatedRoute, private authorService: AuthorService, private router: Router) {
    this.form = new FormGroup({
      firstName: new FormControl('', { validators: [Validators.required] }),
      middleName: new FormControl('', {}),
      lastName: new FormControl('', { validators: [Validators.required] }),
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

  getAuthor(authorId: string): void {
    this.author = new Author();
    this.authorService.getAuthor(authorId).subscribe((authorX) => {
      this.author = authorX;

      this.form.get('firstName').setValue(this.author.first_name);
      this.form.get('middleName').setValue(this.author.middle_names);
      this.form.get('lastName').setValue(this.author.last_name);
      this.form.get('about').setValue(this.author.about);
    });
  }

  addAuthor(): void {
    this.authorService.createAuthor(this.author).subscribe((authorR) => {
      this.authorReturn = authorR;
      this.router.navigate([`/author/view/${this.authorReturn.id}`]);
    });
  }

  updateAuthor(): void {
    this.authorService.updateAuthor(this.author).subscribe(() => {
      this.router.navigate([`/author/view/${this.author.id}`]);
    });
  }

}
