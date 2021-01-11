import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PoolLog } from 'src/app/models/pool-log';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-createlog',
  templateUrl: './createlog.component.html',
  styleUrls: ['./createlog.component.css']
})
export class CreatelogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PoolLog) { }

  ngOnInit(): void {
  }

  onCloseTabButttonClick(){
    this.dialogRef.close;
  }

}
