import { Component, OnInit } from '@angular/core';
import { FacadeService } from 'src/app/services/facade.service';

@Component({
  selector: 'app-admin-screen',
  templateUrl: './admin-screen.component.html',
  styleUrls: ['./admin-screen.component.scss']
})
export class AdminScreenComponent implements OnInit{

  public rol:string = "";

  constructor(
    private facadeService: FacadeService
  ) { }

  ngOnInit(): void {
    this.rol = this.facadeService.getUserGroup();
  }

}
