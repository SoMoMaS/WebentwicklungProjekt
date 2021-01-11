import { JSDocComment } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { PoolLog } from '../models/pool-log';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class PoolLogsService {

  constructor(private webRequestService : WebRequestService) { }

  createPoolLog(logData: Object){
    return this.webRequestService.post('poollogs', logData);
  }

  getPoolLogs(){
    return this.webRequestService.get('poollogs');
  }

  updatePoolLog(updatedLogData: PoolLog){

    console.log('Got into the pool log services.');
    var poollogs = 'poollogs/';
    var uri = poollogs.concat(updatedLogData.uniqID)
    console.log(uri);
    return this.webRequestService.put(uri, updatedLogData);
  }
}
