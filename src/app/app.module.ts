import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';

// Servicios HTTP
import { HttpClientModule } from '@angular/common/http';

// Components
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';

// Partials
import { NavbarComponent } from './partials/navbar/navbar.component';
import { RegistroAdminComponent } from './partials/registro-admin/registro-admin.component';
import { RegistroAlumnoComponent } from './partials/registro-alumno/registro-alumno.component';
import { RegistroMaestroComponent } from './partials/registro-maestro/registro-maestro.component';

// Angular Material
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

// Screens
import { AdminScreenComponent } from './screens/admin-screen/admin-screen.component';
import { AlumnoScreenComponent } from './screens/alumno-screen/alumno-screen.component';
import { MaestroScreenComponent } from './screens/maestro-screen/maestro-screen.component';
import { GraficasScreenComponent } from './screens/graficas-screen/graficas-screen.component';

// Modals
import { EliminarUsuarioModalComponent } from './modals/eliminar-usuario-modal/eliminar-usuario-modal.component';
import { RegistroMateriaScreenComponent } from './screens/registro-materia-screen/registro-materia-screen.component';

// Ngx
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';


@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    RegistroScreenComponent,
    NavbarComponent,
    RegistroAdminComponent,
    RegistroAlumnoComponent,
    RegistroMaestroComponent,
    HomeScreenComponent,
    AdminScreenComponent,
    AlumnoScreenComponent,
    MaestroScreenComponent,
    EliminarUsuarioModalComponent,
    GraficasScreenComponent,
    RegistroMateriaScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgChartsModule,
    FormsModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgxMaterialTimepickerModule
  ],
  providers: [
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
