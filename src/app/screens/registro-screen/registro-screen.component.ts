import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FacadeService } from 'src/app/services/facade.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-registro-screen',
  templateUrl: './registro-screen.component.html',
  styleUrls: ['./registro-screen.component.scss']
})

export class RegistroScreenComponent implements OnInit{

  // JSON para Usuarios
  public user:any = {};

  // Navbar
  public tipo:string = "registro-usuarios";

  //Banderas para Tipo de Usuario en el Formulario
  public isAdmin:boolean = false;
  public isAlumno:boolean = false;
  public isMaestro:boolean = false;
  public tipo_user:string ="";

  // Banderas para Editar
  public editar:boolean = false;
  public idUser:Number = 0;
  public rol:string = "";

  // Errores
  public errors:any = {};

  constructor(
    private location : Location,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private facadeService: FacadeService,
    private adminService: AdminService
  ){}

  ngOnInit(): void {
    // Obtenemos el Rol por la URL (Si Existe)
    if(this.activatedRoute.snapshot.params['rol'] != undefined){
      this.rol = this.activatedRoute.snapshot.params['rol'];
      console.log("Rol detect: ", this.rol);
    }
    // Obenemos el ID por la URL (Si Existe)
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      // Asignamos el ID del Usuario
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idUser);
      // Se Obtiene el ID del Usuario al Cargar la Página
      this.obtenerUserByID();
    }
  }

  // Función Para Obtener Usuario por ID
  public obtenerUserByID(){
    if(this.rol == "administrador"){
      this.adminService.getAdminByID(this.idUser).subscribe({
        next: (response)=>{
          this.user = response;
          // Asignamos los Datos del Usuario
          this.user.first_name = response.user.first_name;
          this.user.last_name = response.user.last_name;
          this.user.email = response.user.email;
          this.user.tipo_usuario = this.rol;
          this.isAdmin = true;
          //this.user.fecha_nacimiento = response.fecha_nacimiento.split("T")[0];
          //console.log("Datos user: ", this.user);
        }, error: (error)=>{
          alert("No se pudieron obtener los datos del usuario para editar");
        }
      });
    }
  }

  public radioChange(event: MatRadioChange) {

    //console.log(event)

    if(event.value == "administrador"){
      this.isAdmin = true;
      this.tipo_user = "administrador"
      this.isAlumno = false;
      this.isMaestro = false;
    }else if (event.value == "alumno"){
      this.isAdmin = false;
      this.isAlumno = true;
      this.tipo_user = "alumno"
      this.isMaestro = false;
    }else if (event.value == "maestro"){
      this.isAdmin = false;
      this.isAlumno = false;
      this.isMaestro = true;
      this.tipo_user = "maestro"
    }
  }
}
