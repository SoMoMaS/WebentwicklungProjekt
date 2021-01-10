import { JSDocComment } from '@angular/compiler';
import { Injectable } from '@angular/core';
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
    console.log('Got into the pool log service');
    return this.webRequestService.get('poollogs');
  }

  updatePoolLog(updatedLogData: Object){
    return this.webRequestService.put('poollogs', updatedLogData);
  }
}
