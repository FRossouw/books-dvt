import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['../forms.scss']
})
export class AuthorFormComponent implements OnInit {

  form: FormGroup;
  update: boolean;
  constructor(private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    let authorId: string;
    this.update = false;
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('id')) {
        authorId = params.get('id');
        this.update = true;
      }
    });
  }

}
