import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookComponent } from './book.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let httpTestingController: HttpTestingController;

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

});
