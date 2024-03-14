import { Component, OnInit } from '@angular/core';
import { FacadeService } from 'src/app/services/facade.service';

@Component({
  selector: 'app-maestro-screen',
  templateUrl: './maestro-screen.component.html',
  styleUrls: ['./maestro-screen.component.scss']
})
export class MaestroScreenComponent implements OnInit{
  public rol:string = "";

  constructor(
    private facadeService: FacadeService
  ){}

  ngOnInit(): void {
    this.rol = this.facadeService.getUserGroup();
  }
}
