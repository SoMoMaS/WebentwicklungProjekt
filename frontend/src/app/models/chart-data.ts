import { ChartDataSets, ChartOptions, ChartTooltipModelBody, ChartType } from 'chart.js';


import { Label } from 'ng2-charts';

export class ChartData {

    constructor(options: ChartOptions, type: ChartType, legend: boolean, labels: Label[], dataSet: ChartDataSets){}
}
