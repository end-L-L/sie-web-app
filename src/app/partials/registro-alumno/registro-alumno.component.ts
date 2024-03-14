import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Router } from '@angular/router';

//JQuery
declare var $:any;

@Component({
  selector: 'app-registro-alumno',
  templateUrl: './registro-alumno.component.html',
  styleUrls: ['./registro-alumno.component.scss']
})
export class RegistroAlumnoComponent implements OnInit{

  @Input() rol: string = "";

  public alumno:any = {};
  public editar:boolean = false;

  // Servicios x Errores
  public errors:any = {};

  // Contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  constructor(
    private router: Router,
    private location: Location,
    private alumnoService: AlumnoService
  ){}

  ngOnInit(): void {
    this.alumno = this.alumnoService.esquemaAlumno();
    this.rol = this.rol;
  }

  // Mostrar password
  showPassword(){
    if(this.inputType_1 == 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  // Mostrar confirmar password
  showPwdConfirmar()
  {
    if(this.inputType_2 == 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  public regresar(){
    this.location.back();
  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.alumnoService.validarAlumno(this.alumno, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }

    if(this.alumno.password == this.alumno.confirmar_password){
      this.alumnoService.registrarAlumno(this.alumno).subscribe({
        next: (response) => {
          alert("Usuario Registrado Correctamente");
          this.router.navigate(["/"]);
        },
        error: (error) => {
          alert("¡Error!: No se Pudo Registrar Usuario");
        }
      });
    } else {
      alert("¡Error!: Las contraseñas no Coinciden");
      this.alumno.password = "";
      this.alumno.confirmar_password = "";
    }
  }

  public actualizar(){}

  //Función para detectar el cambio de fecha
  public changeFecha(event :any){
    console.log(event);
    console.log(event.value.toISOString());

    this.alumno.fecha_nacimiento = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.alumno.fecha_nacimiento);
  }
}
