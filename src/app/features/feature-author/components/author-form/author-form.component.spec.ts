import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorFormComponent } from './author-form.component';
import { of, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from 'src/app/features/feature-author/services/author.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthorReturn } from 'src/app/features/feature-author/models/author-return';
import { AuthorBook } from 'src/app/features/feature-author/models/author-book';
import { Author } from 'src/app/features/feature-author/models/author';

class MockService {
  createAuthor(): Observable<AuthorReturn> { return new Observable<AuthorReturn>(); }
  getAuthor(): Author {
    return {
      href: 'http://localhost:4201/Authors/d9636037-fb42-4885-9890-1f4375f3ef6c',
      id: 'd9636037-fb42-4885-9890-1f4375f3ef6c',
      first_name: 'Tom',
      last_name: 'Rudderham',
      name: 'Tom  Rudderham',
      about: 'Tom kicked off his writing career at Future.',
      version: 'AAAAAAAAEHI='
    } as Author;
  }
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

  it('when form submitted, author should check that the addAuthor method is called', () => {
    component.addAuthor = () => { };
    component.update = true;
    component.saveForm();
    const spy = spyOn(component, 'addAuthor').and.callThrough();
    spy();
    expect(spy).toHaveBeenCalled();

  });

  it('when form submitted, set form values when an author is returned ', () => {
    fixture.detectChanges();
    component.form.controls.firstName.setValue('Tom');
    component.form.controls.middleName.setValue('Middle');
    component.form.controls.lastName.setValue('Seller');
    component.form.controls.about.setValue('About');
    expect(component.form.controls.firstName.value).toEqual('Tom');
    expect(component.form.controls.middleName.value).toEqual('Middle');
    expect(component.form.controls.lastName.value).toEqual('Seller');
    expect(component.form.controls.about.value).toEqual('About');

  });

});
