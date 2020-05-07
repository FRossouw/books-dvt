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
import { Author } from 'src/app/models/author';

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
    component.form.controls.isbn10.setValue('1546753788');
    component.form.controls.isbn13.setValue('9781546753780');
    component.form.controls.title.setValue('Motherboard');
    component.form.controls.about.setValue('A book about motherboards.');
    component.form.controls.abstract.setValue('Abstract about book');
    component.form.controls.image.setValue('');
    component.form.controls.author.setValue({} as BookAuthor);
    component.form.controls.publisher.setValue('');
    component.form.controls.datePublished.setValue('2020/01/01');
    component.form.controls.tags.setValue({} as Tag[]);
    expect(component.form.valid).toBeTruthy();
  });

  it('when form submitted, book should check that the updateBook method is called', () => {
    fixture.detectChanges;
    component.updateBook = () => { };
    component.update = false;
    fixture.detectChanges;
    component.saveForm();
    let spy = spyOn(component, 'updateBook').and.callThrough();
    spy();
    expect(spy).toHaveBeenCalled();

  });

  it('when form submitted, book should check that the addBook method is called', () => {
    fixture.detectChanges;
    component.addBook = () => { };
    component.update = true;
    fixture.detectChanges;
    component.saveForm();
    let spy = spyOn(component, 'addBook').and.callThrough();
    spy();
    expect(spy).toHaveBeenCalled();

  });

});











// component.book.author = {
//   "href": "http://localhost:4201/Authors/d9636037-fb42-4885-9890-1f4375f3ef6c",
//   "id": "d9636037-fb42-4885-9890-1f4375f3ef6c",
//   "first_name": "Tom",
//   "last_name": "Rudderham",
//   "name": "Tom  Rudderham",
//   "about": "Tom kicked off his writing career at Future Publishing, working for magazines including MacFormat, Computer Arts, Imagine FX, and the Official Windows Magazine.",
//   "version": "AAAAAAAAEHI=",
//   "books": [
//     {
//       "href": "http://localhost:4201/Books/9781690181507",
//       "id": "9781690181507",
//       "isbn10": "1690181508",
//       "isbn13": "9781690181507",
//       "title": "iOS 13 Guide"
//     }
//   ]
// } as Author;

// component.authors = [{
//   "href": "http://localhost:4201/Authors/d9636037-fb42-4885-9890-1f4375f3ef6c",
//   "id": "d9636037-fb42-4885-9890-1f4375f3ef6c",
//   "first_name": "Tom",
//   "last_name": "Rudderham",
//   "name": "Tom  Rudderham",
//   "about": "Tom kicked off his writing career at Future Publishing, working for magazines including MacFormat, Computer Arts, Imagine FX, and the Official Windows Magazine.",
//   "version": "AAAAAAAAEHI=",
//   "books": [
//     {
//       "href": "http://localhost:4201/Books/9781690181507",
//       "id": "9781690181507",
//       "isbn10": "1690181508",
//       "isbn13": "9781690181507",
//       "title": "iOS 13 Guide"
//     }
//   ]
// },
// {
//   "href": "http://localhost:4201/Authors/cf3e043d-eba3-492b-8e96-e731fb74cd81",
//   "id": "cf3e043d-eba3-492b-8e96-e731fb74cd81",
//   "first_name": "Will",
//   "last_name": "Grant",
//   "name": "Will  Grant",
//   "about": "Will is a product designer and user experience professional with over 20 years experience overseeing the design, information architecture and usability of web and mobile products that have reached over a billion users.",
//   "version": "AAAAAAAAEIs=",
//   "books": [
//     {
//       "href": "http://localhost:4201/Books/9781788837361",
//       "id": "9781788837361",
//       "isbn10": "1788837363",
//       "isbn13": "9781788837361",
//       "title": "101 UX Principles: A definitive design guide"
//     }
//   ]
// }] as Author[];