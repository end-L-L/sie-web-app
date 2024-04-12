import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { FacadeService } from 'src/app/services/facade.service';

@Component({
  selector: 'app-admin-screen',
  templateUrl: './admin-screen.component.html',
  styleUrls: ['./admin-screen.component.scss']
})

export class AdminScreenComponent implements OnInit{

  public name_user:string = "";
  public lista_admins:any[]= [];

  constructor(
    private facadeService: FacadeService,
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.name_user = this.facadeService.getUserCompleteName();
    // Lista de Admins
    this.obtenerAdmins();
  }

   // Obtener Lista de Administradores
  public obtenerAdmins(){
    this.adminService.obtenerListaAdmins().subscribe({
      next: (response)=>{
        this.lista_admins = response;
        console.log("Lista users: ", this.lista_admins);
      },
      error: (error)=>{
        alert("No se pudo obtener la lista de admins");
      }
    });
  }

  // Función Editar Admin
  public goEditar(idUser: number){
    this.router.navigate(["registro-usuarios/administrador/"+idUser]);
  }

  public delete(idUser: number){

  }
}
