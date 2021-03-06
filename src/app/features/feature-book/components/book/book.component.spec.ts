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

    component.getSearchBooks = () => { };
    component.getBooksPageinated = () => { };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test with a query != null', () => {
    component.query = 'Angular';
    expect(component).toBeTruthy();
  });

  it('should test with a query == null', () => {
    component.query = null;
    expect(component).toBeTruthy();
    const spy = spyOn(component, 'getBooksPageinated');
    spy();
    expect(spy).toHaveBeenCalled();
  });

  it('should increase the amount of books viewable', () => {
    component.displayViewMore = true;
    component.skipBooks = 0;
    component.viewMore();
    expect(component.skipBooks).toEqual(5);
  });

});
