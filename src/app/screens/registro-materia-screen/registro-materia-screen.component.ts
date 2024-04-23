import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

// Servicios
import { MateriaService } from 'src/app/services/materia.service';
import { FacadeService } from 'src/app/services/facade.service';

declare var $: any;

@Component({
  selector: 'app-registro-materia-screen',
  templateUrl: './registro-materia-screen.component.html',
  styleUrls: ['./registro-materia-screen.component.scss'],
})

export class RegistroMateriaScreenComponent implements OnInit {

  // Propiedades
  public token:string = "";
  public editar:boolean = false;
  public materia:any = {};
  public nrc:Number = 0;

  // Check
  public valoresCheckbox: any = [];
  public dias_json: any [] = [];

  // Errores
  public errors:any = {};

  // Array de Días - Checkbox
  public dias:any[]= [
    {value: '1', nombre: 'Lunes'},
    {value: '2', nombre: 'Martes'},
    {value: '3', nombre: 'Miercoles'},
    {value: '4', nombre: 'Jueves'},
    {value: '5', nombre: 'Viernes'},
    {value: '6', nombre: 'Sabado'},
  ];

  constructor(
    private facadeService: FacadeService,
    private materiaService: MateriaService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.token = this.facadeService.getSessionToken();

    if(this.token == ""){
      this.router.navigate(['']);
    }else{

      this.materia = this.materiaService.esquemaMateria();
      console.log("Materia: ", this.materia);

      if(this.activatedRoute.snapshot.params['nrc'] != undefined){
        // NRC Existe, Entonces Estamos Editando
        this.editar = true;
        this.nrc = this.activatedRoute.snapshot.params['nrc'];
        this.obtenerMateriaByNRC();
      }
    }
  }

  public regresar(){
    this.location.back();
  };

  public registrarMateria(){
    // Validación de Materia
    this.errors = [];
    
    this.errors = this.materiaService.validarMateria(this.materia);
    if(!$.isEmptyObject(this.errors)){
      return false;
      //console.log("Materia: ", this.materia);
    }

    // Validación Correcta, Registrar Materia
    this.materiaService.registrarMateria(this.materia).subscribe({
      next: (response) => {
        alert("Materia Registrada Correctamente");
        this.router.navigate(["home"]);
      },
      error: (error) => {
        alert("¡Error!: No se Pudo Registrar Materia");
      }
    });
  }

  public obtenerMateriaByNRC(){
    this.materiaService.getMateriaByNRC(this.nrc).subscribe({
      next: (response)=>{
        this.materia = response;
        this.materia.horaInicio = this.materia.horaInicio.slice(0, -3);
        this.materia.horaFin = this.materia.horaFin.slice(0, -3);
      }, 
      error: (error)=>{
        alert("Datos de Materia no Obtenidos");
      }
    });
  }

  public actualizarMateria(){
    // Validación
    this.errors = [];

    this.errors = this.materiaService.validarMateria(this.materia);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
 
    this.materiaService.editarMateria(this.materia).subscribe({
      next: (response)=>{
        alert("Materia editada correctamente");
        console.log("Materia editada: ", response);
        this.router.navigate(["home"]);
      }, 
      error: (error)=>{
        alert("No se Pudo Editar la Materia");
      }
    });
  }

  // Función Para Detectar Cambio de Checkbox
  public checkboxChange(event:any){
    if(event.checked){
      this.materia.dias_json.push(event.source.value)
    }else{
      console.log(event.source.value);
      this.materia.dias_json.forEach((materia: any, i: any) => {
      
        if(materia == event.source.value){
          this.materia.dias_json.splice(i,1)
        }
      });
    }
  }

  // Función Para Detectar el Cambio de Select
  public revisarSeleccion(nombre: string){
    if(this.materia.dias_json){
      var busqueda = this.materia.dias_json.find((element)=>element==nombre);
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
