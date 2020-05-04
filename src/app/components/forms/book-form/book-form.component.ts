import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/app/models/author';
import { AuthorService } from 'src/app/services/author.service';
import { BookReturn } from 'src/app/models/book-return';
import { BookAuthor } from 'src/app/models/book-author';
import { Tag } from 'src/app/models/tag';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  form: FormGroup;
  update: boolean;
  book: Book;
  authors: Author[];
  tagList: Tag[];
  imageFile: File;
  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private authorService: AuthorService,
    private tagService: TagService,
    private router: Router) {
    this.form = new FormGroup({
      isbn10: new FormControl('', {}),
      isbn13: new FormControl('', {}),
      title: new FormControl('', {}),
      about: new FormControl('', {}),
      abstract: new FormControl('', {}),
      image: new FormControl('', {}),
      author: new FormControl('', {}),
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
      //this.updateAuthor();
    } else {
      this.addBook();
    }
  }

  private getBook(isbn13: string): void {
    this.book = new Book();
    this.bookService.getBook(isbn13).subscribe((bookX) => {
      this.book = bookX;
      console.log(bookX);
      console.log("........................." + JSON.stringify(this.book.tags));
    });
  }

  private getAuthors(): void {
    this.authors = new Array();
    this.authorService.getAuthors().subscribe((authorX) => {
      authorX.forEach((authorFE) => {
        this.authors.push(authorFE);
      });
    });
  }

  private getTags(): void {
    this.tagList = new Array();
    this.tagService.getTags().subscribe((tagX) => {
      tagX.forEach((tagFe) => {
        this.tagList.push(tagFe);
      });
    });
  }

  private addBook(): void {
    let bookReturn = {} as BookReturn;
    this.convertAuthorToBookAuthor();
    this.convertTagsToBookTags();

    this.bookService.createBook(this.book).subscribe(bookR => {
      bookReturn = bookR;
      this.bookService.postPicture(this.book.isbn13, this.imageFile).subscribe();
      this.router.navigate([`/book/view/${bookReturn.id}`]);
    });

  }

  private convertAuthorToBookAuthor(): void {
    let bookAuth = {} as BookAuthor;
    let selectedAuthor: Author;
    let bAuth = this.book.author;

    this.authors.forEach(element => {
      if (element.id.toString() == bAuth.toString()) {
        selectedAuthor = element;
        bookAuth.id = selectedAuthor.id;
        bookAuth.href = selectedAuthor.href;
        bookAuth.name = selectedAuthor.name;
        this.book.author = bookAuth;
      }
    });
  }

  private convertTagsToBookTags(): void {
    let bookTags = this.book.tags;
    let tagArray: Tag[] = new Array();
    let selectedTag: Tag;

    this.tagList.forEach(tagElement => {
      if (tagElement.id.toString() == bookTags.toString()) {
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

}
