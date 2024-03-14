import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// JQuery
declare var $:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  @Input() tipo:string = "";

  public token:string = "";

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {

  }

  public logout(){

  }

  public clickNavLink(link: string){
    this.router.navigate([link]);
    setTimeout(() => {
      this.activarLink(link);
    }, 100);
  }

  public activarLink(link: string){
    if(link == "home"){

    }
  }
}
