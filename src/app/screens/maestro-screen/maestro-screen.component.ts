import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MaestroService } from 'src/app/services/maestro.service';
import { FacadeService } from 'src/app/services/facade.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ActionModalComponent } from 'src/app/modals/action-modal/action-modal.component';

@Component({
  selector: 'app-maestro-screen',
  templateUrl: './maestro-screen.component.html',
  styleUrls: ['./maestro-screen.component.scss']
})

export class MaestroScreenComponent implements OnInit{

  public name_user:string = "";
  public rol:string = "";
  public token : string = "";
  public lista_maestros: any[] = [];

  // Tabla de Datos de Maestros
  //displayedColumns: string[] = ['id_trabajador', 'nombre', 'email', 'fecha_nacimiento', 'telefono', 'rfc', 'cubiculo', 'area_investigacion', 'materias_json','editar', 'eliminar'];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<DatosUsuario>(this.lista_maestros as DatosUsuario[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private facadeService: FacadeService,
    private maestroService: MaestroService,
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
  
      // Lista de Maestros
      this.obtenerMaestros();
  
      // Paginador
      this.initPaginator();

      // Mostrar Columnas de la Tabla
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

  // Obtener Maestros
  public obtenerMaestros(){
    this.maestroService.obtenerListaMaestros().subscribe({
      next: (response)=>{
        this.lista_maestros = response;
        if(this.lista_maestros.length > 0){
          // Agregar Campos de Usuario
          this.lista_maestros.forEach(usuario => {
            usuario.first_name = usuario.user.first_name;
            usuario.last_name = usuario.user.last_name;
            usuario.email = usuario.user.email;
          });
          this.dataSource = new MatTableDataSource<DatosUsuario>(this.lista_maestros as DatosUsuario[]);
        }
      }, error: (error)=>{
        alert("No se pudo obtener la lista de usuarios");
      }
    });
  }

  goEditar(idUser: number){
    const dialogRef = this.dialog.open(ActionModalComponent,{
      data: {id: idUser, action: "editar", opc: 3}, // Enviar Datos al Modal
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
      data: {id: idUser, action: "eliminar", opc: 3},
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

  // Función para Mostrar Columnas de la Tabla
  mostrarColumnas(){
    if(this.rol == "administrador"){
      this.displayedColumns = ['id_trabajador', 'nombre', 'email', 'fecha_nacimiento', 'telefono', 'rfc', 'cubiculo', 'area_investigacion', 'materias_json','editar', 'eliminar'];
    }else{
      this.displayedColumns = ['id_trabajador', 'nombre', 'email', 'fecha_nacimiento', 'telefono', 'rfc', 'cubiculo', 'area_investigacion', 'materias_json'];
    }
  }
}

export interface DatosUsuario {
  id: number,
  id_trabajador: number;
  first_name: string;
  last_name: string;
  email: string;
  fecha_nacimiento: string,
  curp: string,
  rfc: string,
  edad: number,
  telefono: string,
  cubiculo: string,
  area_investigacion: string,
  materias_json: any[]
}
