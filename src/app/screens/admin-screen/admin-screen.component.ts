import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { FacadeService } from 'src/app/services/facade.service';
import { ActionModalComponent } from 'src/app/modals/action-modal/action-modal.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-screen',
  templateUrl: './admin-screen.component.html',
  styleUrls: ['./admin-screen.component.scss']
})

export class AdminScreenComponent implements OnInit{

  public token:string = "";
  public name_user:string = "";
  public lista_admins:any[]= [];

  constructor(
    private facadeService: FacadeService,
    private adminService: AdminService,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.token = this.facadeService.getSessionToken();

    if(this.token == ""){
      this.router.navigate(['']);
    }else{
      this.name_user = this.facadeService.getUserCompleteName();
      this.obtenerAdmins();
    }
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

  goEditar(idUser: number){
    const dialogRef = this.dialog.open(ActionModalComponent,{
      data: {id: idUser, action: "editar", opc: 1}, // Enviar Datos al Modal
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isEdit){
        window.location.reload();
      }else{
        alert("Sin Acción");
      }
    });
  }

  goEliminar(idUser: number){
    const dialogRef = this.dialog.open(ActionModalComponent,{
      data: {id: idUser, action: "eliminar", opc: 1},
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        window.location.reload();
      }else{
        alert("Sin Acción");
      }
    });
  }
}
