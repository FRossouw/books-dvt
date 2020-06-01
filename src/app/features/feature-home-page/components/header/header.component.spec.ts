import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/features/feature-authorization/services/auth.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

class MockService {

}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          AuthService,
          useValue: MockService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.auth.loggedIn = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the onChange() method 1 time', () => {

    const spy = spyOn(component, 'onChange');
    component.onChange();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(1);

  });

  it('should call the onChange() method if no query is selected', () => {
    el = fixture.debugElement.query(By.css('input'));
    el.triggerEventHandler('change', {});

    expect(el).toBeTruthy();

  });

  it('should call the onChange() method if a query is selected', () => {
    component.searchQuery = 'Angular';
    el = fixture.debugElement.query(By.css('input'));
    el.triggerEventHandler('change', {});

    expect(el).toBeTruthy();

  });

});
