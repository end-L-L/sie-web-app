import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MateriaService } from 'src/app/services/materia.service';

@Component({
  selector: 'app-action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss']
})
export class ActionModalComponent implements OnInit{
  
  public action:string = ""; // Editar - eliminar
  public field_1:string = "";
  public field_2:string = "";

  constructor(
    private materiaService: MateriaService,
    private dialogRef: MatDialogRef<ActionModalComponent>,
    private router: Router,
    @Inject (MAT_DIALOG_DATA) public data: any
  ){}
  
  ngOnInit(): void {
    this.action = this.data.action;
    
    if(this.action == "editar"){
      this.field_1 = "Editar";
      this.field_2 = "Registro";
    }

    if(this.action == "eliminar"){
      this.field_1 = "Eliminar";
      this.field_2 = "Registro";
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
