import { analyzeAndValidateNgModules, ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoolLogsService } from 'src/app/services/pool-logs.service';
import { PoolLog } from '../../models/pool-log';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreatelogComponent } from '../createlog/createlog.component';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { LogmodificationComponent } from '../logmodification/logmodification.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material';
import { ChartFactoryService } from 'src/app/services/chart-factory.service';
import { ChartData } from 'src/app/models/chart-data';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';



import { Label } from 'ng2-charts';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;

  /*
   Chart testing
  */
  options: ChartOptions;
  type: ChartType;
  legend: boolean;
  labels: Label[];
  dataSet: ChartDataSets[];



  chartData: ChartData
  poollogs: PoolLog[];
  datasource: MatTableDataSource<PoolLog>;
  newPoolLog: PoolLog;
  displayedColumns: string[] = ['date', 'phValue', 'comment', 'backflushInterval', 'chlorineValue', 'waterTemp', 'airTemp', 'modify', 'delete'];
  constructor(private poolLogsService: PoolLogsService,
    private router: Router,
    private dialog: MatDialog,
    private tokenstorage: TokenStorageService) {


    if (this.tokenstorage.getToken() === null) {
      console.log('Unathorized.');
      router.navigate(['/login']);
    }

   
  }

  getLogs(): Observable<any> {
    this.poolLogsService.getPoolLogs().subscribe((response: any) => {

      if (response.statusCode === 401) {
        console.log('Unathorized.');
        this.router.navigate(['/login']);
        // Rerouting

      }
      else {

        this.poollogs = [];
        let poolLogObjArr = response.poolLogs;


        for (let poolLog of poolLogObjArr) {

          let newLog = new PoolLog(new Date(poolLog.date),
            poolLog.phValue,
            poolLog.comment,
            poolLog.backflushInterval,
            poolLog.chlorineValue,
            poolLog.waterTemp,
            poolLog.airTemp);
          newLog.uniqID = poolLog.id;

          this.poollogs.push(newLog);
          console.log(newLog);

        }

        this.datasource = new MatTableDataSource(this.poollogs);
        this.datasource.sort = this.sort;
      }

      
    });
    return;
    // console.log('Logs after initialization');
    // console.log(this.datasource);

  }



  ngOnInit(): void {
    this.getLogs();
  }

  ngAfterViewInit() {
   

    this.datasource = new MatTableDataSource(this.poollogs);
    this.datasource.sort = this.sort;
    //this.poollogs = this.datasource.data;
  }

  

  onSignout() {
    this.tokenstorage.logOut();
    this.router.navigate(['/login']);
  }

  onCreateLogClick() {
    const dialogRef = this.dialog.open(CreatelogComponent, {
      width: '700px',
      height: '700px',
      data: { newLog: this.newPoolLog }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.newPoolLog = new PoolLog(new Date(result.date),
        result.phValue,
        result.comment,
        result.backflushInterval,
        result.chlorineValue,
        result.waterTemp,
        result.airTemp)


      this.createLog(this.newPoolLog);
      window.location.reload();

    });
  }

  onDeleteLogClicked(logToDelete: PoolLog) {
    this.poolLogsService.deletePoolLog(logToDelete);
    window.location.reload();
  }


  onModifyLogClicked(currentLog: PoolLog) {

    const dialogRef = this.dialog.open(LogmodificationComponent, {
      width: '700px',
      height: '700px',
      data: { logToModify: currentLog }
    });

    dialogRef.afterClosed().subscribe(result => {
      currentLog.date = new Date(result.date).toLocaleDateString();
      currentLog.phValue = result.phValue;
      currentLog.comment = result.comment;
      currentLog.backflushInterval = result.backflushInterval;
      currentLog.chlorineValue = result.chlorineValue;
      currentLog.waterTemp = result.waterTemp;
      currentLog.airTemp = result.airTemp;

      this.modifyLog(currentLog);
      //window.location.reload();

    });
  }

  createLog(newPoolLog: PoolLog) {
    this.poolLogsService.createPoolLog(newPoolLog).subscribe((response: any) => {
      if (response.statusCode === 401) {
        console.log('Unathorized.');
        this.router.navigate(['/login']);
      }
      else {
        console.log(response);
        this.poollogs.push(response.poollog);
      }
    });
  }

  modifyLog(modifiedLog: PoolLog) {
    this.poolLogsService.updatePoolLog(modifiedLog)
  }



  getChart() {

    // Options
    this.options = {
      responsive: true,
      scales: { xAxes: [{}], yAxes: [{}] },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      }
    }

    // Chart type
    this.type = 'bar' as ChartType;


    // legend
    this.legend = true;

    this.labels = new Array();
    //chartData = new Array();

    // dataset
    var phValues = new Array();
    var chlorineValues = new Array();
    var airTemps = new Array();
    var waterTemps = new Array();
    var backWashDurations = new Array();



    for (let value of this.poollogs) {
      this.labels.push(value.date);
      phValues.push(value.phValue);
      chlorineValues.push(value.chlorineValue);
      airTemps.push(value.airTemp);
      waterTemps.push(value.waterTemp);
      backWashDurations.push(value.backflushInterval);
    }

    this.dataSet = [
        {data: phValues, label: 'PH'}, 
        {data: chlorineValues, label: 'Chlorine'}, 
        {data: airTemps, label: 'Air temperature'}, 
        {data: waterTemps, label: 'Water temperature'}, 
        {data: backWashDurations, label: 'Backwash duration'}
    ]

    //let chart = new ChartData(options, barChartType, chartLegend, labels, chartDataSet)
    //return chart;
  }



}
