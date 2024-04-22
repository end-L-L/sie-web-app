import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { AdminService } from 'src/app/services/admin.service';
import { FacadeService } from 'src/app/services/facade.service';

interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

interface ChartDataset {
  data: number[];
  label: string;
  backgroundColor: string | string[];
}

@Component({
  selector: 'app-graficas-screen',
  templateUrl: './graficas-screen.component.html',
  styleUrls: ['./graficas-screen.component.scss'],
})

export class GraficasScreenComponent implements OnInit {

  public data:any = {};
  public token:string = '';

  constructor(
    private facadeService: FacadeService,
    private adminServices: AdminService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.token = this.facadeService.getSessionToken();

    if (this.token === '') {
      this.router.navigate(['']);
    }

    this.obtenerTotalUsuarios();
  }

  // Line Chart
  lineChartData: ChartData ={
    labels: ['Administradores', 'Alumnos', 'Maestros'],
    datasets: [
      {
        data:[],
        label: 'Cantidad de Usuarios',
        backgroundColor: [],
      },
    ],
  };

  lineChartOptions = {
    responsive:false,
    maintainAspectRatio: false,
  }

  lineChartPlugins = [ DatalabelsPlugin ];

  // Bar Chart
  barChartData: ChartData = {
    labels:  ['Administradores', 'Alumnos', 'Maestros'],
    datasets: [
      {
        data: [], // Dynamic Data
        label: 'Cantidad de Usuarios',
        backgroundColor: [
        'rgba(255, 99, 132, 0.4)',
        'rgba(200, 100, 255, 0.6)',
        'rgba(40, 180, 210, 0.8)',
        ],
      },
    ],
  };

  barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  barChartPlugins = [DatalabelsPlugin];

  // Pie Chart
  pieChartData: ChartData = {
    labels:  ['Administradores', 'Alumnos', 'Maestros'],
    datasets: [
      {
        data: [], // Dynamic Data
        label: 'Registro de usuarios',
        backgroundColor: ['#FCFF44', '#F1C8F2', '#31E731'],
      },
    ],
  };

  pieChartOption = {
    responsive: true,
    maintainAspectRatio: false,
  };

  pieChartPlugins = [DatalabelsPlugin];

  // Polar Area Chart
  polarAreaChartData: ChartData = {
    labels:  ['Administradores', 'Alumnos', 'Maestros'],
    datasets: [
      {
        data: [], // Dynamic Data
        label: 'Registro de usuarios',
        backgroundColor: ['#F88406', '#FCFF44', '#31E7E7'],
      },
    ],
  };

  polarAreaChartOption = {
    responsive: true,
    maintainAspectRatio: false,
  };

  polarAreaChartPlugins = [DatalabelsPlugin];

  obtenerTotalUsuarios() {
    this.adminServices.getTotalUsuarios().subscribe({
      next: (data) => {
        console.log('Datos:', data);
        this.updateChartData(data);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al Obtener Datos', error);
      },
    });
  }

  updateChartData(data: any) {
    // Actualizar Datos de Gráficos 
    this.lineChartData.datasets[0].data = [data.admins, data.alumnos, data.maestros];
    this.barChartData.datasets[0].data = [data.admins, data.alumnos, data.maestros];
    this.pieChartData.datasets[0].data = [data.admins, data.alumnos, data.maestros];
    this.polarAreaChartData.datasets[0].data = [data.admins, data.alumnos, data.maestros];

    // Reasignar Datos para Activar Actualizaciones de Gráficos
    this.lineChartData = { ...this.lineChartData };
    this.barChartData = { ...this.barChartData };
    this.pieChartData = { ...this.pieChartData };
    this.polarAreaChartData = { ...this.polarAreaChartData };
    
    this.cdr.detectChanges();
  }
}
