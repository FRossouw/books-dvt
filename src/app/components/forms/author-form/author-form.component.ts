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
    if(this.activatedRoute.snapshot.queryParams['id']) {
      this.activatedRoute.paramMap.subscribe(params => {
        authorId = params.get('id');
        console.log("Parameter ULR " + authorId);
        this.update = true;
      });
    }
    
  }

}
