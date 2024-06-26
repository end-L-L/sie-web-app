import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { AdminScreenComponent } from './screens/admin-screen/admin-screen.component';
import { AlumnoScreenComponent } from './screens/alumno-screen/alumno-screen.component';
import { MaestroScreenComponent } from './screens/maestro-screen/maestro-screen.component';
import { GraficasScreenComponent } from './screens/graficas-screen/graficas-screen.component';
import { RegistroMateriaScreenComponent } from './screens/registro-materia-screen/registro-materia-screen.component';
import { MateriasScreenComponent } from './screens/materias-screen/materias-screen.component';

const routes: Routes = [
  { path: '', component: LoginScreenComponent, pathMatch:'full' },
  { path: 'registro-usuarios', component: RegistroScreenComponent, pathMatch:'full' },
  { path: 'registro-usuarios/:rol/:id', component: RegistroScreenComponent, pathMatch: 'full' },
  { path: 'home', component: HomeScreenComponent, pathMatch:'full' },
  { path: 'administrador', component: AdminScreenComponent, pathMatch:'full' },
  { path: 'alumnos', component: AlumnoScreenComponent, pathMatch:'full' },
  { path: 'maestros', component: MaestroScreenComponent, pathMatch:'full' },
  { path: 'graficas', component: GraficasScreenComponent, pathMatch:'full' },
  { path: 'registro-materia', component: RegistroMateriaScreenComponent, pathMatch:'full' },
  { path: 'registro-materia/:nrc', component: RegistroMateriaScreenComponent, pathMatch:'full' },
  { path: 'materias', component: MateriasScreenComponent, pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
