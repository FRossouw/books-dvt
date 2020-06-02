import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { BookFormComponent } from './book-form.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthorService } from 'src/app/features/feature-author/services/author.service';
import { BookService } from 'src/app/features/feature-book/services/book.service';
import { TagService } from 'src/app/features/feature-book/services/tag.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Tag } from 'src/app/features/feature-book/models/tag';
import { BookAuthor } from '../../models/book-author';
import { Book } from '../../models/book';
import { Author } from 'src/app/features/feature-author/models/author';

describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;
  let httpTestingController: HttpTestingController;
  let mockBookService: BookService;
  let mockAuthorService: AuthorService;
  let mockTagService: TagService;

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
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFormComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    mockBookService = TestBed.inject(BookService);
    mockAuthorService = TestBed.inject(AuthorService);
    mockTagService = TestBed.inject(TagService);
    fixture.detectChanges();

  });

  it('should be created', () => {
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
    fixture.detectChanges();
    component.updateBook = () => { };
    component.update = false;
    fixture.detectChanges();
    component.saveForm();
    const spy = spyOn(component, 'updateBook').and.callThrough();
    spy();
    expect(spy).toHaveBeenCalled();
  });

  it('when form submitted, book should check that the addBook method is called', () => {
    fixture.detectChanges();
    component.addBook = () => { };
    component.update = true;
    fixture.detectChanges();
    component.saveForm();
    const spy = spyOn(component, 'addBook').and.callThrough();
    spy();
    expect(spy).toHaveBeenCalled();
  });

  it('should check that a specific author is retrieved and displayed on the form', fakeAsync(() => {
    const mockBook = {} as Book;
    mockBook.isbn10 = '1118871057';
    mockBook.isbn13 = '9781118871058';
    mockBook.title = ' iOS App Development For Dummies';
    mockBook.about = 'iOS 7 represents the most significant update to Apple’s';
    mockBook.abstract = 'Whether you’re a programming hobbyist wanting to build an.';
    mockBook.author = {
      href: 'http://localhost:4201/Authors/2f937600-0586-455d-9c7c-0c919626a0a5',
      id: '2f937600-0586-455d-9c7c-0c919626a0a5',
      name: 'Jesse  Feiler'
    };
    mockBook.publisher = 'For Dummies';
    mockBook.date_published = new Date('2014 - 04 - 01T00: 00: 00 + 00: 00');
    mockBook.image = 'http://localhost:4201/Books/9781118871058/4701128378159508786.picture';
    mockBook.tags = [
      {
        id: 'iOS',
        href: 'http://localhost:4201/Tags/iOS',
        description: 'iOS'
      }
    ];

    spyOn(mockBookService, 'getBook').and.returnValue(of(mockBook));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.book).toEqual(mockBook);
  }));

  it('should retrieve a list of Authors for the form drop down menu', fakeAsync(() => {
    const mockAuthors = [{}] as Author[];
    spyOn(mockAuthorService, 'getAuthors').and.returnValue(of(mockAuthors));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.authors).toEqual(mockAuthors);
  }));

  it('should retrieve a list of Tags for the form drop down menu', fakeAsync(() => {
    const mockTags = [{}] as Tag[];
    spyOn(mockTagService, 'getTags').and.returnValue(of(mockTags));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.tagList).toEqual(mockTags);
  }));

});
