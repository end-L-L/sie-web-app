import { Component, OnInit } from '@angular/core';
import { FacadeService } from 'src/app/services/facade.service';

@Component({
  selector: 'app-alumno-screen',
  templateUrl: './alumno-screen.component.html',
  styleUrls: ['./alumno-screen.component.scss']
})
export class AlumnoScreenComponent implements OnInit{

  public rol:string = "";

  constructor(
    private facadeService: FacadeService
  ){}

  ngOnInit(): void {
    this.rol = this.facadeService.getUserGroup();
  }
}
