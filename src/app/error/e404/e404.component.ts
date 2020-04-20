import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-e404',
  templateUrl: './e404.component.html',
  styleUrls: ['./e404.component.css']
})
export class E404Component implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {

  }

  goBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
