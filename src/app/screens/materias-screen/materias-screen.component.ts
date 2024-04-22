import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ActionModalComponent } from 'src/app/modals/action-modal/action-modal.component';

// Servicios
import { FacadeService } from 'src/app/services/facade.service';
import { MateriaService } from 'src/app/services/materia.service';

@Component({
  selector: 'app-materias-screen',
  templateUrl: './materias-screen.component.html',
  styleUrls: ['./materias-screen.component.scss']
})

export class MateriasScreenComponent implements OnInit{

  public token: string = "";
  public lista_materias: any[] = [];
  public rol: string = "";
  public name_user:string = "";
  public dataColumns:string[];

  displayedColumnsMateria: string[] = ['nrc', 'nombre', 'seccion', 'dias', 'horaInicio', 'horaFinal', 'salon', 'programa', 'editar', 'eliminar'];
  dataSourceMateria = new MatTableDataSource<DatosMateria>(this.lista_materias as DatosMateria[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSourceMateria.paginator = this.paginator;
  }

  constructor(
    private facadeService: FacadeService,
    private materiaService: MateriaService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    
    // Obtener Token
    this.token = this.facadeService.getSessionToken();
    
    // Validar Existencia de Token
    if(this.token == ""){
      this.router.navigate([""]);
    }

    this.rol = this.facadeService.getUserGroup();
    this.name_user = this.facadeService.getUserCompleteName();
    
    if(this.rol != "administrador"){
      this.displayedColumnsMateria = ['nrc', 'nombre', 'seccion', 'dias', 'horaInicio', 'horaFinal', 'salon', 'programa'];
    }
    
    // Obtener Lista de Usuarios
    this.obtenerMaterias();

    // Iniciar Paginator
    this.initPaginator();
  }

  // Función Para Obtener la Lista de Materias
  public obtenerMaterias(){
    this.materiaService.obtenerListaMaterias().subscribe({
      next: (response)=>{
        this.lista_materias = response;
        console.log("Lista materias: ", this.lista_materias);
        if(this.lista_materias.length > 0){
          this.dataSourceMateria = new MatTableDataSource<DatosMateria>(this.lista_materias as DatosMateria[]);
        }
      }, 
      error: (error)=>{
        alert("No se pudo obtener la lista de usuarios");
      }
    });
  }

  // Paginador
  public initPaginator(){
    setTimeout(() => {
      this.dataSourceMateria.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
          return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
      };
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
    },500);
  }

  goHome(){
    this.router.navigate(['/home']);
  }

  goRegistrarMateria(){
    this.router.navigate(['/registro-materia']);
  }

  goEditarMateria(nrc:number){
    const dialogRef = this.dialog.open(ActionModalComponent,{
      data: {id: nrc, action: "editar", opc: 4},
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isEdit){
        window.location.reload();
      }else{
        alert("Sin Acción");
      }
    });
  }
  
  goEliminarMateria(nrc:number){
    const dialogRef = this.dialog.open(ActionModalComponent,{
      data: {id: nrc, action: "eliminar", opc: 4},
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        window.location.reload();
      }else{
        alert("Sin Acción");
      }
    });
  }
}

export interface DatosMateria {
  nrc: number,
  nombre: string;
  seccion: number;
  dias: string;
  horaInicio: string;
  horaFinal: string,
  salon: string,
  programa: string,
}