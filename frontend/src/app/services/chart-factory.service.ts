import { Injectable } from '@angular/core';
import { PoolLog } from '.././models/pool-log';
import { ChartData } from '.././models/chart-data';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

import { Label } from 'ng2-charts';
@Injectable({
  providedIn: 'root'
})
export class ChartFactoryService {

  constructor(private PoolLogs: PoolLog[]){ }

  getChart(poolLogs: PoolLog[]): ChartData{

    //var chart : ChartData;

    // Options
    let options: ChartOptions = {
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
    let barChartType: ChartType = 'bar';

    // Label
    let labels: Label[];
    // ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];

    // legend
    let chartLegend = true;


    let chartDataSet: ChartDataSets;
    //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }

    labels = new Array();
    //chartData = new Array();
    
    
    let data = new Array();
    poolLogs.forEach(function(value){
      labels.push(value.date);
      data.push(value.phValue);
    });

    chartDataSet.data = data;

    let chart = new ChartData(options, barChartType, chartLegend, labels, chartDataSet)
    return chart;
  }
}
