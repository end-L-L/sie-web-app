import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';

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
}
