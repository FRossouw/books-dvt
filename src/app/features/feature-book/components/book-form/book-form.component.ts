import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Book } from 'src/app/features/feature-book/models/book';
import { BookService } from 'src/app/features/feature-book/services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/app/features/feature-author/models/author';
import { AuthorService } from 'src/app/features/feature-author/services/author.service';
import { BookReturn } from 'src/app/features/feature-book/models/book-return';
import { Tag } from 'src/app/features/feature-book/models/tag';
import { TagService } from 'src/app/features/feature-book/services/tag.service';
import { BookAuthor } from '../../models/book-author';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  form: FormGroup;
  update: boolean;
  book: Book;
  bookReturn: BookReturn;
  authors: Author[] = [];
  tagList: Tag[] = [];
  tagAddArray: Tag[] = new Array();
  imageFile: File;
  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private authorService: AuthorService,
    private tagService: TagService,
    private router: Router) {
    this.form = new FormGroup({
      isbn10: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
      isbn13: new FormControl('', { validators: [Validators.required] }),
      title: new FormControl('', { validators: [Validators.required] }),
      about: new FormControl('', {}),
      abstract: new FormControl('', {}),
      image: new FormControl('', {}),
      author: new FormControl('', { validators: [Validators.required] }),
      datePublished: new FormControl('', {}),
      publisher: new FormControl('', {}),
      tags: new FormControl('', {})
    });
    this.book = {} as Book;
  }

  ngOnInit(): void {
    this.getAuthors();
    this.getTags();
    let bookIsbn13: string;
    this.update = false;
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('id')) {
        bookIsbn13 = params.get('id');
        this.update = true;
        this.getBook(bookIsbn13);
      }
    });

    this.isbn10.valueChanges.subscribe(x => this.book.isbn10 = x);
    this.isbn13.valueChanges.subscribe(x => this.book.isbn13 = x);
    this.title.valueChanges.subscribe(x => this.book.title = x);
    this.about.valueChanges.subscribe(x => this.book.about = x);
    this.abstract.valueChanges.subscribe(x => this.book.abstract = x);
    this.image.valueChanges.subscribe(x => this.book.image = x);
    this.author.valueChanges.subscribe(x => this.book.author = x);
    this.datePublished.valueChanges.subscribe(x => this.book.date_published = x);
    this.publisher.valueChanges.subscribe(x => this.book.publisher = x);
    this.tags.valueChanges.subscribe(x => this.book.tags = x);

  }

  get isbn10(): AbstractControl { return this.form.get('isbn10'); }
  get isbn13(): AbstractControl { return this.form.get('isbn13'); }
  get title(): AbstractControl { return this.form.get('title'); }
  get about(): AbstractControl { return this.form.get('about'); }
  get abstract(): AbstractControl { return this.form.get('abstract'); }
  get image(): AbstractControl { return this.form.get('image'); }
  get author(): AbstractControl { return this.form.get('author'); }
  get datePublished(): AbstractControl { return this.form.get('datePublished'); }
  get publisher(): AbstractControl { return this.form.get('publisher'); }
  get tags(): AbstractControl { return this.form.get('tags'); }

  saveForm(): void {
    if (this.update) {
      this.updateBook();
    } else {
      this.addBook();
    }
  }

  getBook(isbn13: string): void {
    this.book = new Book();
    this.bookService.getBook(isbn13).subscribe((bookX) => {
      this.book = bookX;

      this.form.get('isbn10').setValue(this.book.isbn10);
      this.form.get('isbn13').setValue(this.book.isbn13);
      this.form.get('title').setValue(this.book.title);
      this.form.get('about').setValue(this.book.about);
      this.form.get('abstract').setValue(this.book.abstract);
      this.form.get('image').setValue(this.book.image);
      this.form.get('author').setValue(this.book.author);
      this.form.get('datePublished').setValue(String(this.book.date_published).substring(0, 10));
      this.form.get('publisher').setValue(this.book.publisher);
      this.form.get('tags').setValue(this.book.tags);
    });
  }

  getAuthors(): void {
    this.authors = [];
    this.authorService.getAuthors().subscribe((retrievedAuthors) => {
      this.authors = retrievedAuthors;
    });
  }

  getTags(): void {
    this.tagList = [];
    this.tagService.getTags().subscribe((retrievedTags) => {
      this.tagList = retrievedTags;
    });
  }

  addBook(): void {
    this.convertAuthorToBookAuthor();
    this.convertTagsToBookTags();

    this.bookService.createBook(this.book).subscribe(bookR => {
      this.bookReturn = bookR;
      this.bookService.postPicture(this.book.isbn13, this.imageFile).subscribe();
      this.router.navigate([`/book/view/${this.bookReturn.id}`]);
    });
  }

  updateBook(): void {
    this.convertAuthorToBookAuthor();
    this.convertTagsToBookTags();
    this.bookService.updateBook(this.book).subscribe((bookReturn) => {
      this.router.navigate([`/book/view/${this.book.isbn13}`]);
    });
  }

  convertAuthorToBookAuthor(): void {
    const bookAuth = {} as BookAuthor;
    let selectedAuthor: Author;
    const bAuth = this.book.author;

    this.authors.forEach(element => {
      if (element.name.toString() === bAuth.toString()) {
        selectedAuthor = element;
        bookAuth.id = selectedAuthor.id;
        bookAuth.href = selectedAuthor.href;
        bookAuth.name = selectedAuthor.name;
        this.book.author = bookAuth;
      }
    });
  }

  convertTagsToBookTags(): void {
    const bookTags = this.book.tags;
    const tagArray: Tag[] = new Array();
    let selectedTag: Tag;

    this.tagList.forEach(tagElement => {
      if (tagElement.id.toString() === bookTags.toString()) {
        selectedTag = tagElement;
        this.book.tags = {} as Tag[];
        tagArray.push(selectedTag);
        this.book.tags = tagArray;
      }
    });

  }

  uploadPicture(event) {
    if (event.target.files.length) {
      this.imageFile = event.target.files[0];
    }
  }

  addTag(event) {
    const bookTags = this.book.tags;
    const tagArray = this.tagAddArray;
    let selectedTag: Tag;
    const newTag = event.target.value;
    this.book.tags = {} as Tag[];

    this.tagList.forEach(tagElement => {
      if (tagElement.id.toString() === bookTags.toString()) {
        selectedTag = tagElement;
        tagArray.push(selectedTag);
        this.book.tags = tagArray;
      }
    });
  }

}
