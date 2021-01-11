import { analyzeAndValidateNgModules, ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoolLogsService } from 'src/app/services/pool-logs.service';
import { PoolLog } from '../../models/pool-log';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreatelogComponent } from '../createlog/createlog.component';
import { TokenStorageService } from 'src/app/services/token-storage.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  poollogs: PoolLog[];

  newPoolLog: PoolLog;
  displayedColumns: string[] = ['date', 'phValue', 'comment', 'backflushInterval','chlorineValue', 'waterTemp', 'airTemp'];
  constructor(private poolLogsService: PoolLogsService, 
              private router : Router, 
              private dialog: MatDialog, 
              private tokenstorage: TokenStorageService) {
    poolLogsService.getPoolLogs().subscribe((response : any) =>{

      if (response.statusCode === 401) {
          console.log('Unathorized.');
          router.navigate(['/login']);
          // Rerouting

      }
      else{


        this.poollogs = new Array();
        let poolLogObjArr = response.poolLogs;

        for (let poolLog of poolLogObjArr) {
          
          let newLog = new PoolLog(new Date(poolLog.date),
                                    poolLog.phValue,
                                    poolLog.comment, 
                                    poolLog.backflushInterval,
                                    poolLog.chlorineValue,
                                    poolLog.waterTemp,
                                    poolLog.airTemp);

          this.poollogs.push(newLog);

        }

        console.log(this.poollogs);
      }
     

    });
   }

  ngOnInit(): void {
  }

  onSignout(){
    this.tokenstorage.logOut();
    this.router.navigate(['/login']);
  }

  onCreateLogClick(){
    console.log('Imma gonna create a log');
    const dialogRef = this.dialog.open(CreatelogComponent, {
      width: '700px',
      height:'700px',
      data: {newLog: this.newPoolLog }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      console.log(result.date);
      this.newPoolLog = new PoolLog(new Date(result.date), 
                                    result.phValue, 
                                    result.comment,
                                    result.backflushInterval, 
                                    result.chlorineValue, 
                                    result.waterTemp, 
                                    result.airTemp)
      console.log(this.newPoolLog);


      this.createLog(this.newPoolLog);
      window.location.reload();

    });

   
  }

  createLog(newPoolLog: PoolLog){
      this.poolLogsService.createPoolLog(newPoolLog).subscribe((response : any) =>{
        if (response.statusCode === 401) {
          console.log('Unathorized.');
          this.router.navigate(['/login']);
        }
        else{
          console.log(response);
          this.poollogs.push(response.poollog);
        }
      });
  }



}
