import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';

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
  public rol:string = "";

  constructor(
    private facadeService: FacadeService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.rol = this.facadeService.getUserGroup();
    this.token = this.facadeService.getSessionToken();
  }

  public logout(){
    this.facadeService.logout().subscribe({
      next: () => {
        // Elimina el Token de la Sesión
        this.facadeService.destroyUser();
        // Navega al Login
        this.router.navigate(["/"]);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  public goRegistro(){
    this.router.navigate(["registro-usuarios"]);
  }

  public clickNavLink(link: string){
    this.router.navigate([link]);
    setTimeout(() => {
      this.activarLink(link);
    }, 100);
  }

  public activarLink(link: string){
    if(link == "alumnos"){
      $("materias").removeClass("active");
      $("#graficas").removeClass("active");
      $("#principal").removeClass("active");
      $("#maestro").removeClass("active");
      $("#alumno").addClass("active");
    }else if(link == "maestros"){
      $("materias").removeClass("active");
      $("#graficas").removeClass("active");
      $("#principal").removeClass("active");
      $("#alumno").removeClass("active");
      $("#maestro").addClass("active");
    }else if(link == "home"){
      $("materias").removeClass("active");
      $("#graficas").removeClass("active");
      $("#alumno").removeClass("active");
      $("#maestro").removeClass("active");
      $("#principal").addClass("active");
    }else if(link == "graficas"){
      $("materias").removeClass("active");
      $("#alumno").removeClass("active");
      $("#maestro").removeClass("active");
      $("#principal").removeClass("active");
      $("#graficas").addClass("active");
    } else if(link == "materias"){
      $("#graficas").removeClass("active");
      $("#principal").removeClass("active");
      $("#alumno").removeClass("active");
      $("#maestro").removeClass("active");
      $("#materias").addClass("active");
    }
  }
}
