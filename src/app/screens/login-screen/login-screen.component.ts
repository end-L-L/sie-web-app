import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';

declare var $: any; // jquery

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit{

  public username: string = "";
  public password: string = "";
  public type: String = "password";
  public errors:any = {}

  constructor(
    private router: Router,
    private facadeService: FacadeService
  ) { }

  ngOnInit(): void {

  }

  public login(){
    //Validar
    this.errors = [];

    this.errors = this.facadeService.validarLogin(this.username, this.password);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    //Si no hay Errores, Iniciamos Sesion
    this.facadeService.login(this.username, this.password).subscribe({
    next: (response)=>{
      //console.log(response);
      this.facadeService.saveUserData(response);
      this.router.navigate(["home"]);
    },
    error: (error)=>{
      alert("No se pudo iniciar sesión");
    }
    });
  }

  public registrar(){
    this.router.navigate(["registro-usuarios"]);
  }

  public showPassword(){
    if(this.type == "password"){
      $("#show-password").addClass("show-password");
      $("#show-password").attr("data-password", true);
      this.type = "text";
    }else if(this.type == "text"){
      $("#show-password").removeClass("show-password");
      $("#show-password").attr("data-password", false);
      this.type = "password";
    }

  }
}
