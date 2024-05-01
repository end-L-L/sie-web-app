import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoService } from 'src/app/services/alumno.service';
import { FacadeService } from 'src/app/services/facade.service';

//JQuery
declare var $:any;

@Component({
  selector: 'app-registro-alumno',
  templateUrl: './registro-alumno.component.html',
  styleUrls: ['./registro-alumno.component.scss']
})
export class RegistroAlumnoComponent implements OnInit{

  @Input() rol: string = "";
  @Input() datos_user:any = {};

  public alumno:any = {};
  public editar:boolean = false;
  public token: string = "";
  public idUser: Number = 0;

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
    private activatedRoute: ActivatedRoute,
    private alumnoService: AlumnoService,
    private facadeService: FacadeService
  ){}

  ngOnInit(): void {
    // Validar Parametro en URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      // Asignamos el ID por URL
      this.idUser = this.activatedRoute.snapshot.params['id'];
      //console.log("ID User: ", this.idUser);
      // Asignamos los Datos del Maestro
      this.alumno = this.datos_user;
    }else{
      // Esquema -> JSON
      this.alumno = this.alumnoService.esquemaAlumno();
      this.alumno.rol = this.rol;
      this.token = this.facadeService.getSessionToken();
    }
  }

  // Mostrar Password
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

  // Mostrar Confirmar Password
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
    // Validar
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

  public actualizar(){
    // Validar
    this.errors = [];

    this.errors = this.alumnoService.validarAlumno(this.alumno, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }

    this.alumnoService.editarAlumno(this.alumno).subscribe({
      next: (response)=>{
        alert("Alumno Editado Correctamente");
        this.router.navigate(["home"]);
      },
      error: (error)=>{
        alert("¡Error!: No se Pudo Editar Alumno");
      }
    });
  }

  // Función para Detectar el Cambio de Fecha
  public changeFecha(event :any){
    //console.log(event);
    //console.log(event.value.toISOString());
    this.alumno.fecha_nacimiento = event.value.toISOString().split("T")[0];
    //console.log("Fecha: ", this.alumno.fecha_nacimiento);
  }
}
