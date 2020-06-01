import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { AuthorFormComponent } from './author-form.component';
import { of } from 'rxjs';
import { ActivatedRoute, Routes } from '@angular/router';
import { AuthorService } from 'src/app/features/feature-author/services/author.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthorReturn } from 'src/app/features/feature-author/models/author-return';
import { AuthorDetailsComponent } from '../author-details/author-details.component';
import { Author } from '../../models/author';

describe('AuthorFormComponent', () => {
  let component: AuthorFormComponent;
  let fixture: ComponentFixture<AuthorFormComponent>;
  let mockService: AuthorService;
  let httpTestingController: HttpTestingController;

  const routes: Routes = [{
    path: 'author/view/:id',
    component: AuthorDetailsComponent
  }];

  const mockAuthorReturn = {
    href: 'reference',
    id: '372dc0d0-6368-4eb3-8876-8b20d07cf722'
  } as AuthorReturn;

  const mockAuthor = {
    href: 'http://localhost:4201/Authors/ca94acca-9f7f-441b-959f-7e4f357ab60a',
    id: 'ca94acca-9f7f-441b-959f-7e4f357ab60a',
    first_name: 'Anne',
    last_name: 'Boehm',
    name: 'Anne  Boehm',
    about: 'With over 30 years as a technical author, Anne Boehm obviously loves computing and writing.',
    version: 'AAAAAAAAEHs=',
    books: []
  } as Author;

  const mockActivatedRoute = {
    paramMap: of({ get: (id) => id = '372dc0d0-6368-4eb3-8876-8b20d07cf722' })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorFormComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(routes)],
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
    fixture = TestBed.createComponent(AuthorFormComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    mockService = TestBed.inject(AuthorService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    component.getAuthor = () => { };
    component.updateAuthor = () => { };
    component.addAuthor = () => { };
    expect(component).toBeTruthy();
  });

  it('should update an author when the form is submitted', () => {
    fixture.detectChanges();
    component.updateAuthor = () => { };
    component.update = false;
    fixture.detectChanges();
    component.saveForm();
    const spy = spyOn(component, 'updateAuthor').and.callThrough();
    spy();
    expect(spy).toHaveBeenCalled();

  });

  it('should add a new author when the form is submitted', () => {
    component.addAuthor = () => { };
    component.update = true;
    component.saveForm();
    const spy = spyOn(component, 'addAuthor').and.callThrough();
    spy();
    expect(spy).toHaveBeenCalled();

  });

  it('should display author details on the form when they are retrieved', () => {
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

  it('should navigate to the newly created author\'s details', fakeAsync(() => {
    spyOn(mockService, 'createAuthor').and.returnValue(of(mockAuthorReturn));
    component.addAuthor();
    fixture.detectChanges();
    expect(component.authorReturn).toEqual(mockAuthorReturn);
  }));

  it('should retrieve a specific request author', fakeAsync(() => {
    spyOn(mockService, 'getAuthor').and.returnValue(of(mockAuthor));
    component.getAuthor(mockAuthor.id);
    fixture.detectChanges();
    expect(component.author).toEqual(mockAuthor);
  }));

});
