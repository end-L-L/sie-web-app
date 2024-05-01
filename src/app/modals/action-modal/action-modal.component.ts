import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import { MaestroService } from 'src/app/services/maestro.service';
import { MateriaService } from 'src/app/services/materia.service';

@Component({
  selector: 'app-action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss']
})
export class ActionModalComponent implements OnInit{
  
  public action:string = ""; // Editar - Eliminar
  public opc:number = 0; // 1 - 2 - 3 - 4
  public field_1:string = "";
  public field_2:string = "";

  constructor(
    private adminService: AdminService,
    private alumnoService: AlumnoService,
    private maestroService: MaestroService,
    private materiaService: MateriaService,
    private dialogRef: MatDialogRef<ActionModalComponent>,
    private router: Router,
    @Inject (MAT_DIALOG_DATA) public data: any
  ){}
  
  ngOnInit(): void {
    this.action = this.data.action;
    this.opc = this.data.opc;

    if(this.action == "editar"){
      this.field_1 = "Editar";
    }

    if(this.action == "eliminar"){
      this.field_1 = "Eliminar";
    }

    if(this.opc == 1){
      this.field_2 = "Registro de Administrador";
    }

    if(this.opc == 2){
      this.field_2 = "Registro de Alumno";
    }

    if(this.opc == 3){
      this.field_2 = "Registro de Maestro";
    }

    if(this.opc == 4){
      this.field_2 = "Registro de Materia";
    }
  }

  public closeModal(){
    
    if(this.data.action == "editar"){
      this.dialogRef.close({isEdit:false});
    }
    
    if(this.data.action == "eliminar"){
      this.dialogRef.close({isDelete:false});
    }
  }

  public actionModal(){
    if(this.opc == 1){
      if(this.action == "editar"){
        this.router.navigate(["registro-usuarios/administrador/"+this.data.id]);
        this.dialogRef.close({isEdit:true});
      }

      if(this.action == "eliminar"){
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
    }

    if(this.opc == 2){
      if(this.action == "editar"){
        this.router.navigate(["registro-usuarios/alumno/"+this.data.id]);
        this.dialogRef.close({isEdit:true});
      }

      if(this.action == "eliminar"){
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
    }

    if(this.opc == 3){
      if(this.action == "editar"){
        this.router.navigate(["registro-usuarios/maestro/"+this.data.id]);
        this.dialogRef.close({isEdit:true});
      }

      if(this.action == "eliminar"){
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

    if(this.opc == 4){
      if(this.action == "editar"){
        this.router.navigate(['/registro-materia/'+this.data.id]);
        this.dialogRef.close({isEdit:true});
      }
  
      if(this.action == "eliminar"){
        this.materiaService.eliminarMateria(this.data.id).subscribe({
          next: (response: any)=>{
            //console.log(response);
            this.dialogRef.close({isDelete:true});
          },
          error: (error: any)=>{
            this.dialogRef.close({isDelete:false});
          }
        });
      }
    }
  }
}
