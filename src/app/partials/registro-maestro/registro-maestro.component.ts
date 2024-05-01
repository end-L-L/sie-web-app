import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestroService } from 'src/app/services/maestro.service';
import { FacadeService } from 'src/app/services/facade.service';

//JQuery
declare var $:any;

@Component({
  selector: 'app-registro-maestro',
  templateUrl: './registro-maestro.component.html',
  styleUrls: ['./registro-maestro.component.scss']
})

export class RegistroMaestroComponent implements OnInit{

  @Input() rol:string = "";
  @Input() datos_user:any = {};

  public maestro:any = {};
  public editar:boolean = false;
  public token: string = "";
  public idUser: Number = 0;

  // Check
  public valoresCheckbox: any = [];
  public materias_json: any [] = [];

  // Servicios x Errores
  public errors:any = {};

  // Contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  // Array de Materias - Checkbox
  public materias:any[]= [
    {value: '1', nombre: 'Aplicaciones Web'},
    {value: '2', nombre: 'Programación 1'},
    {value: '3', nombre: 'Bases de datos'},
    {value: '4', nombre: 'Tecnologías Web'},
    {value: '5', nombre: 'Minería de datos'},
    {value: '6', nombre: 'Desarrollo móvil'},
    {value: '7', nombre: 'Estructuras de datos'},
    {value: '8', nombre: 'Administración de redes'},
    {value: '9', nombre: 'Ingeniería de Software'},
    {value: '10', nombre: 'Administración de S.O.'},
  ];

    // Array de Materias - Select
    public areas: any[] = [
      {value: '1', viewValue: 'Desarrollo Web'},
      {value: '2', viewValue: 'Programación'},
      {value: '3', viewValue: 'Bases de datos'},
      {value: '4', viewValue: 'Redes'},
      {value: '5', viewValue: 'Matemáticas'},
    ];

  constructor(
    private router: Router,
    private location : Location,
    private activatedRoute: ActivatedRoute,
    private maestroService: MaestroService,
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
      this.maestro = this.datos_user;
    }else{
      // Esquema -> JSON
      this.maestro = this.maestroService.esquemaMaestro();
      this.maestro.rol = this.rol;
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

    this.errors = this.maestroService.validarMaestro(this.maestro, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }

    if(this.maestro.password == this.maestro.confirmar_password){
      this.maestroService.registrarMaestro(this.maestro).subscribe({
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
      this.maestro.password = "";
      this.maestro.confirmar_password = "";
    }
  }


  public actualizar(){
    // Validar
    this.errors = [];

    this.errors = this.maestroService.validarMaestro(this.maestro, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }

    this.maestroService.editarMaestro(this.maestro).subscribe({
      next: (response)=>{
        alert("Maestro Editado Correctamente");
        this.router.navigate(["home"]);
      },
      error: (error)=>{
        alert("¡Error!: No se Pudo Editar Maestro");
      }
    });
  }

  public checkboxChange(event:any){
    //console.log("Evento: ", event);
    if(event.checked){
      this.maestro.materias_json.push(event.source.value)
    }else{
      //console.log(event.source.value);
      this.maestro.materias_json.forEach((materia: any, i: any) => {
        if(materia == event.source.value){
          this.maestro.materias_json.splice(i,1)
        }
      });
    }
    //console.log("Array materias: ", this.maestro);
  }

  // Función Para Detectar el Cambio de Fecha
  public changeFecha(event :any){
    //console.log(event);
    //console.log(event.value.toISOString());
    this.maestro.fecha_nacimiento = event.value.toISOString().split("T")[0];
    //console.log("Fecha: ", this.maestro.fecha_nacimiento);
  }

  // Función Para Detectar el Cambio de Select
  public revisarSeleccion(nombre: string){
    if(this.maestro.materias_json){
      var busqueda = this.maestro.materias_json.find((element)=>element==nombre);
      if(busqueda != undefined){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
}
