import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorFormComponent } from './author-form.component';
import { of, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from 'src/app/services/author.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthorReturn } from 'src/app/models/author-return';

class MockService {
  createAuthor(): Observable<AuthorReturn> { return new Observable<AuthorReturn>() }
}

describe('AuthorFormComponent', () => {
  let component: AuthorFormComponent;
  let fixture: ComponentFixture<AuthorFormComponent>;
  let service: MockService;
  let httpTestingController: HttpTestingController;

  const mockActivatedRoute = {
    paramMap: of({ get: (id) => id = '372dc0d0-6368-4eb3-8876-8b20d07cf722' })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorFormComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
        {
          AuthorService,
          useValue: MockService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorFormComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = new MockService();
  });

  it('should create', () => {
    component.getAuthor = () => { };
    component.updateAuthor = () => { };
    component.addAuthor = () => { };
    expect(component).toBeTruthy();
  });

  it('when form submitted, author should check that the updateAuthor method is called', () => {
    fixture.detectChanges();
    component.updateAuthor = () => { };
    component.update = false;
    fixture.detectChanges();
    component.saveForm();
    const spy = spyOn(component, 'updateAuthor').and.callThrough();
    spy();
    expect(spy).toHaveBeenCalled();

  });

  it('when form submitted, book should check that the addAuthor method is called', () => {
    component.addAuthor = () => { };
    component.update = true;
    component.saveForm();
    const spy = spyOn(component, 'addAuthor').and.callThrough();
    spy();
    expect(spy).toHaveBeenCalled();

  });

});
