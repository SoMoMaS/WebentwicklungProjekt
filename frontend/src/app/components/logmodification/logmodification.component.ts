import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PoolLog } from 'src/app/models/pool-log';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-logmodification',
  templateUrl: './logmodification.component.html',
  styleUrls: ['./logmodification.component.css']
})
export class LogmodificationComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PoolLog) { }

  ngOnInit(): void {
  }

  onCloseTabButttonClick(){
    this.dialogRef.close;
  }

}
