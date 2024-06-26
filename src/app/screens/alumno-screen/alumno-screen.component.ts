import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnoService } from 'src/app/services/alumno.service';
import { FacadeService } from 'src/app/services/facade.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ActionModalComponent } from 'src/app/modals/action-modal/action-modal.component';

declare var $:any;

@Component({
  selector: 'app-alumno-screen',
  templateUrl: './alumno-screen.component.html',
  styleUrls: ['./alumno-screen.component.scss']
})

export class AlumnoScreenComponent implements OnInit{

  public name_user:string = "";
  public rol:string = "";
  public token : string = "";
  public lista_alumnos: any[] = [];

  // Tabla de Datos de Alumnos
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<DatosUsuario>(this.lista_alumnos as DatosUsuario[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private facadeService: FacadeService,
    private alumnoService: AlumnoService,
    private router: Router,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    // Login Token
    this.token = this.facadeService.getSessionToken();

    // No Token, Login
    if(this.token == ""){
      this.router.navigate([""]);
    }else{
      this.name_user = this.facadeService.getUserCompleteName();
      this.rol = this.facadeService.getUserGroup();
      
      // Lista de Alumnos
      this.obtenerAlumnos();

      // Paginador
      this.initPaginator();

      // Mostrar Columnas
      this.mostrarColumnas();
    }
  }

  // Paginación
  public initPaginator(){
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      // Modificar Etiquetas del Paginador a Español
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

  // Obtener Alumnos
  public obtenerAlumnos(){
    this.alumnoService.obtenerListaAlumnos().subscribe({
      next: (response: any)=>{
        this.lista_alumnos = response;
        //console.log("Lista users: ", this.lista_alumnos);
        if(this.lista_alumnos.length > 0){
          // Agregar Datos de Usuario
          this.lista_alumnos.forEach(usuario => {
            usuario.first_name = usuario.user.first_name;
            usuario.last_name = usuario.user.last_name;
            usuario.email = usuario.user.email;
          });
          //console.log("Otro user: ", this.lista_alumnos);
          this.dataSource = new MatTableDataSource<DatosUsuario>(this.lista_alumnos as DatosUsuario[]);
        }
      },
      error: ()=>{
        alert("No se pudo obtener la lista de usuarios");
      }
    });
  }

  goEditar(idUser: number){
    const dialogRef = this.dialog.open(ActionModalComponent,{
      data: {id: idUser, action: "editar", opc: 2}, // Enviar Datos al Modal
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

  goEliminar(idUser: number){
    const dialogRef = this.dialog.open(ActionModalComponent,{
      data: {id: idUser, action: "eliminar", opc: 2},
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

   // Función Para Mostrar Columnas
   public mostrarColumnas(){
    if(this.rol == "administrador" || this.rol == "maestro"){
      this.displayedColumns =['matricula', 'nombre', 'email', 'fecha_nacimiento', 'edad', 'curp', 'rfc', 'telefono', 'ocupacion', 'editar', 'eliminar'];
    }else if(this.rol == "alumno"){
      this.displayedColumns = ['matricula', 'nombre', 'email', 'fecha_nacimiento', 'edad', 'curp', 'rfc', 'telefono', 'ocupacion'];
    }
  }
}

export interface DatosUsuario {
  id: number,
  matricula: number;
  first_name: string;
  last_name: string;
  email: string;
  fecha_nacimiento: string,
  curp: string,
  rfc: string,
  edad: number,
  telefono: string,
  ocupacion: string

}
