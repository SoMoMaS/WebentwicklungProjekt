import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoolLogsService } from 'src/app/services/pool-logs.service';
import { PoolLog } from '../../models/pool-log';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  poollogs: PoolLog[];
  constructor(private poolLogsService: PoolLogsService, private router : Router) {
    poolLogsService.getPoolLogs().subscribe((response : any) =>{

      if (response.statusCode === 401) {
          console.log('Unathorized.');
          router.navigate(['/login']);
          // Rerouting

      }
      else{


        this.poollogs = new Array();
        //this.poollogs = response.poollogs;
        let poolLogObjArr = response.poolLogs;

        for (let poolLog of poolLogObjArr) {
          let newLog = new PoolLog(poolLog.date,
                                    poolLog.phValue,
                                    poolLog.comment, 
                                    poolLog.backflushInterval,
                                    poolLog.chlorineValue,
                                    poolLog.waterTemp,
                                    poolLog.airTemp);

          this.poollogs.push(newLog);

        }
      }
     

    });
   }

  ngOnInit(): void {
  }



}
