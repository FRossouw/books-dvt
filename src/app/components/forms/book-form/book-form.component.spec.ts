import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFormComponent } from './book-form.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { TagService } from 'src/app/services/tag.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BookAuthor } from 'src/app/models/book-author';
import { Tag } from 'src/app/models/tag';

class MockBookService { }

class MockAuthorService { }

class MockTagService { }

describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;
  let httpTestingController: HttpTestingController;
  let mockBS: MockBookService;
  let mockAS: MockAuthorService;
  let mockTS: MockTagService;

  const mockActivatedRoute = {
    paramMap: of({ get: (id) => id = '372dc0d0-6368-4eb3-8876-8b20d07cf722' })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookFormComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
        {
          AuthorService,
          useValue: MockAuthorService
        },
        {
          BookService,
          useValue: MockBookService
        },
        {
          TagService,
          useValue: MockTagService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFormComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockBS = new MockBookService();
    mockAS = new MockAuthorService();
    mockTS = new MockTagService();
  });

  it('should create', () => {
    component.getBook = {} = () => { };
    component.addBook = {} = () => { };
    component.updateBook = {} = () => { };

    component.getAuthors = {} = () => { };
    component.getTags = {} = () => { };
    component.uploadPicture = {} = () => { };
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('submit valid form', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['isbn10'].setValue('1546753788');
    component.form.controls['isbn13'].setValue('9781546753780');
    component.form.controls['title'].setValue('Motherboard');
    component.form.controls['about'].setValue('A book about motherboards.');
    component.form.controls['abstract'].setValue('Abstract about book');
    component.form.controls['image'].setValue('');
    component.form.controls['author'].setValue({} as BookAuthor);
    component.form.controls['publisher'].setValue('');
    component.form.controls['datePublished'].setValue('2020/01/01');
    component.form.controls['tags'].setValue({} as Tag[]);
    expect(component.form.valid).toBeTruthy();
  });

});
