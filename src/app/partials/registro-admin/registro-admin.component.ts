import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

//JQuery
declare var $:any;

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.scss']
})
export class RegistroAdminComponent implements OnInit{

  @Input() rol: string = "";

  public admin:any = {};
  public editar:boolean = false;

  // Servicios x Errores
  public errors:any = {};

  //Contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  constructor(
    private adminService: AdminService
  ){}

  ngOnInit(): void {
    //Definir el esquema a mi JSON
    this.admin = this.adminService.esquemaAdmin();
    this.admin.rol = this.rol;
    console.log("Admin: ", this.admin);
    console.log("Rol: ", this.rol);
  }

  public regresar() {

  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.adminService.validarAdmin(this.admin, this.editar)
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
  }

  public actualizar(){

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
}
