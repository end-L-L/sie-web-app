import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AdminService } from 'src/app/services/admin.service';
import { FacadeService } from 'src/app/services/facade.service';

//JQuery
declare var $:any;

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.scss']
})

export class RegistroAdminComponent implements OnInit{

  @Input() rol: string = "";
  @Input() datos_user: any = {};

  public admin:any = {};
  public editar:boolean = false;
  public token:string = "";
  public idUser:string = "";

  // Servicios x Errores
  public errors:any = {};

  //Contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  constructor(
    private router: Router,
    private location: Location,
    public activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private facadeService: FacadeService
  ){}

  ngOnInit(): void {
    // Si Existe ID, Entonces se Editará
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      // Obtenemos el ID del Usuario
      this.idUser = this.activatedRoute.snapshot.params['id'];
      //console.log("ID User: ", this.idUser);
      // Obtenemos los Datos del Usuario
      this.admin = this.datos_user;
    }else{
      this.admin = this.adminService.esquemaAdmin();
      this.admin.rol = this.rol;
      this.token = this.facadeService.getSessionToken();
    }

    //console.log("Admin: ", this.admin);
  }

  public regresar() {
    this.location.back();
  }

  public registrar(){
    // Validar
    this.errors = [];

    this.errors = this.adminService.validarAdmin(this.admin, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }

    // Registrar
    if(this.admin.password == this.admin.confirmar_password){
      this.adminService.registrarAdmin(this.admin).subscribe({
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
      this.admin.password = "";
      this.admin.confirmar_password = "";
    }
  }

  public actualizar(){
    // Validar
    this.errors = [];

    this.errors = this.adminService.validarAdmin(this.admin, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }

    this.adminService.editarAdmin(this.admin).subscribe({
      next: (response)=>{
        alert("Administrador editado correctamente");
        //lconsole.log("Admin editado: ", response);
        this.router.navigate(["home"]);
      }, error: (error)=>{
        alert("No se pudo editar el administrador");
      }
    });
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
  showPwdConfirmar(){
    if(this.inputType_2 == 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }
}
