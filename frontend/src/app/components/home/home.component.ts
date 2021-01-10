import { Component, OnInit } from '@angular/core';
import { PoolLogsService } from 'src/app/services/pool-logs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  poollogs: any[];
  constructor(private poolLogsService: PoolLogsService) {
    poolLogsService.getPoolLogs().subscribe((logs) =>{
      // ? convevert to poollog[];
      this.poollogs = logs;
      console.log(logs);

    });
   }

  ngOnInit(): void {
  }



}
