import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorDetailsComponent } from './author-details.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('AuthorDetailsComponent', () => {
  let component: AuthorDetailsComponent;
  let fixture: ComponentFixture<AuthorDetailsComponent>;
  const mockActivatedRoute = { 
    paramMap: of({ get: () => '372dc0d0-6368-4eb3-8876-8b20d07cf722' }) 
  };

  //  id: '372dc0d0-6368-4eb3-8876-8b20d07cf722'

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorDetailsComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
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
    fixture = TestBed.createComponent(AuthorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
