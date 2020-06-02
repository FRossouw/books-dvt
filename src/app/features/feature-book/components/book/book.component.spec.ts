import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { BookComponent } from './book.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let httpTestingController: HttpTestingController;
  let mockService: BookService;

  const mockActivatedRoute = {
    paramMap: of({ get: (name) => name = 'Angular' })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookComponent],
      imports: [HttpClientTestingModule],
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
    fixture = TestBed.createComponent(BookComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    mockService = TestBed.inject(BookService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    component.getSearchBooks = () => { };
    component.getBooksPageinated = () => { };
    expect(component).toBeTruthy();
  });

  it('should increase the amount of books being displayed on screen', () => {
    component.skipBooks = 0;
    component.displayViewMore = true;
    component.viewMore();
    expect(component.skipBooks).toBe(5);
  });

  it('should not increase the amount of books being displayed on screen', () => {
    component.skipBooks = 0;
    component.displayViewMore = false;
    component.viewMore();
    expect(component.skipBooks).toBe(0);
  });

  it('should indicate that there are no more books to be returned from the API', fakeAsync(() => {
    const mockBooks = [] as Book[];
    spyOn(mockService, 'getBooks').and.returnValue(of(mockBooks));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.noBooksFound).toBeTrue();
  }));

  // it('should', fakeAsync(() => {
  //   const mockBook = [{} as Book] as Book[];
  //   spyOn(mockService, 'getBooks').and.returnValue(of(mockBook));
  //   component.ngOnInit();
  //   fixture.detectChanges();
  //   component.books[0].author.id = "";
  //   expect(component.noBooksFound).toBeFalse();
  // }));

});
