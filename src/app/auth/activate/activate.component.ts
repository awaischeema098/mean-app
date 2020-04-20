import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {
  [x: string]: any;

  constructor(private authService: AuthService,
              private  route: ActivatedRoute,
              private router: Router ) { }
  
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log();
      this.authService.activeAccount(params.token)
      
    });
  }
  goBack() {
    this.router.navigate(['/auth/login'], {relativeTo: this.route});
  }

}
