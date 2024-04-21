import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { AdminService } from 'src/app/services/admin.service';

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

  constructor(
    private adminServices: AdminService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.obtenerTotalUsuarios();
  }

  // Bar Chart
  barChartData: ChartData = {
    labels: ['Administradores', 'Maestros', 'Alumnos'],
    datasets: [
      {
        data: [], // This will hold dynamic data for user counts
        label: 'Cantidad de Usuarios',
        backgroundColor: ['#007bff', '#28a745', '#dc3545'],
      },
    ],
  };

  barChartOptions = {
    responsive: true,
  };

  barChartPlugins = [DatalabelsPlugin];

  // Pie Chart
  pieChartData: ChartData = {
    labels: ['Administradores', 'Maestros', 'Alumnos'],
    datasets: [
      {
        data: [], // Datos dinámicos irán aquí
        label: 'Registro de usuarios',
        backgroundColor: ['#FCFF44', '#F1C8F2', '#31E731'],
      },
    ],
  };

  pieChartOption = {
    responsive: true,
  };

  pieChartPlugins = [DatalabelsPlugin];

  // Doughnut Chart
  doughnutChartData: ChartData = {
    labels: ['Administradores', 'Maestros', 'Alumnos'],
    datasets: [
      {
        data: [], // Datos dinámicos irán aquí
        label: 'Registro de usuarios',
        backgroundColor: ['#F88406', '#FCFF44', '#31E7E7'],
      },
    ],
  };

  doughnutChartOption = {
    responsive: true,
  };

  doughnutChartPlugins = [DatalabelsPlugin];

  obtenerTotalUsuarios() {
    this.adminServices.getTotalUsuarios().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.updateChartData(data);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al obtener datos de usuarios', error);
      },
    });
  }

  updateChartData(data: any) {
    this.pieChartData.datasets[0].data = [data.admins, data.maestros, data.alumnos];
    this.doughnutChartData.datasets[0].data = [data.admins, data.maestros, data.alumnos];
    this.barChartData.datasets[0].data = [data.admins, data.maestros, data.alumnos];

    // Reasignar Datos para Activar Actualizaciones de Gráficos
    this.pieChartData = { ...this.pieChartData };
    this.doughnutChartData = { ...this.doughnutChartData };
    this.barChartData = { ...this.barChartData };
    this.cdr.detectChanges();
  }
}
