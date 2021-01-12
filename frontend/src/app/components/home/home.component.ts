import { analyzeAndValidateNgModules, ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoolLogsService } from 'src/app/services/pool-logs.service';
import { PoolLog } from '../../models/pool-log';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreatelogComponent } from '../createlog/createlog.component';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { LogmodificationComponent } from '../logmodification/logmodification.component';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material';
import { PrintHook } from '@angular/flex-layout';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;

  poollogs: PoolLog[];
  datasource: MatTableDataSource<PoolLog>;
  newPoolLog: PoolLog;
  displayedColumns: string[] = ['date', 'phValue', 'comment', 'backflushInterval', 'chlorineValue', 'waterTemp', 'airTemp', 'modify', 'delete'];
  constructor(private poolLogsService: PoolLogsService,
    private router: Router,
    private dialog: MatDialog,
    private tokenstorage: TokenStorageService) {

    console.log(this.tokenstorage.getToken())
    if (this.tokenstorage.getToken() === null) {
      console.log('Unathorized.');
      router.navigate(['/login']);
    }


    poolLogsService.getPoolLogs().subscribe((response: any) => {

      if (response.statusCode === 401) {
        console.log('Unathorized.');
        router.navigate(['/login']);
        // Rerouting

      }
      else {


        this.poollogs = [];
        let poolLogObjArr = response.poolLogs;

        console.log(poolLogObjArr);

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

        }

        console.log(this.poollogs);
      }

      this.datasource = new MatTableDataSource(this.poollogs);


    });
  }

  

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.datasource = new MatTableDataSource(this.poollogs);
    this.datasource.sort = this.sort;
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

  onDeleteLogClicked(logToDelete: PoolLog){
      this.poolLogsService.deletePoolLog(logToDelete);
      window.location.reload();
  }


  onModifyLogClicked(currentLog: PoolLog) {

    console.log('Got into the modify click events method. printing current log begore modification');
    console.log(currentLog);
    const dialogRef = this.dialog.open(LogmodificationComponent, {
      width: '700px',
      height: '700px',
      data: { logToModify: currentLog }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      currentLog.date = new Date(result.date).toLocaleDateString();
      currentLog.phValue = result.phValue;
      currentLog.comment = result.comment;
      currentLog.backflushInterval = result.backflushInterval;
      currentLog.chlorineValue = result.chlorineValue;
      currentLog.waterTemp = result.waterTemp;
      currentLog.airTemp = result.airTemp;

      console.log(' After modif');
      console.log(currentLog);


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

    console.log('Got the modified poollog. About to call the update log from the home component.')
    this.poolLogsService.updatePoolLog(modifiedLog)
  }



}
