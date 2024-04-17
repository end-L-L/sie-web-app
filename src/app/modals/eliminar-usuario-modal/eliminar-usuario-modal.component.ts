import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import { MaestroService } from 'src/app/services/maestro.service';


@Component({
  selector: 'app-eliminar-usuario-modal',
  templateUrl: './eliminar-usuario-modal.component.html',
  styleUrls: ['./eliminar-usuario-modal.component.scss']
})

export class EliminarUsuarioModalComponent implements OnInit{

  public rol: string = "";

  constructor(
    private adminService: AdminService,
    private alumnoService: AlumnoService,
    private maestroService: MaestroService,
    private dialogRef: MatDialogRef<EliminarUsuarioModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
    this.rol = this.data.rol;
    console.log("Rol modal: ", this.rol);
  }

  public cerrarModal(){
    this.dialogRef.close({isDelete:false});
  }

  public eliminarUsuario(){
    if(this.rol == "administrador"){
      this.adminService.eliminarAdmin(this.data.id).subscribe({
        next: (response: any)=>{
          //console.log(response);
          this.dialogRef.close({isDelete:true});
        },
        error: (error: any)=>{
          this.dialogRef.close({isDelete:false});
        }
      });
    }

    if(this.rol == "alumno"){
      this.alumnoService.eliminarAlumno(this.data.id).subscribe({
        next: (response)=>{
          //console.log(response);
          this.dialogRef.close({isDelete:true});
        },
        error: (error)=>{
          this.dialogRef.close({isDelete:false});
        }
      });
    }

    if(this.rol == "maestro"){
      this.maestroService.eliminarMaestro(this.data.id).subscribe({
        next: (response)=>{
          //console.log(response);
          this.dialogRef.close({isDelete:true});
        },
        error: (error)=>{
          this.dialogRef.close({isDelete:false});
        }
      });
    }
  }
}
