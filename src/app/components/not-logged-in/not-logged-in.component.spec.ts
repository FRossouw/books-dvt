import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NotLoggedInComponent } from './not-logged-in.component';
import { AuthService } from 'src/app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

class MockAuth {

}

describe('NotLoggedInComponent', () => {
  let component: NotLoggedInComponent;
  let fixture: ComponentFixture<NotLoggedInComponent>;
  let testBedService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotLoggedInComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          AuthService,
          useValue: MockAuth
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotLoggedInComponent);
    component = fixture.componentInstance;
    testBedService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
