export class PoolLog {

    uniqID: string;
    date : any;
    phValue : number;
    comment : string;
    backflushInterval: number;
    chlorineValue : number;
    waterTemp : number;
    airTemp: number;
    constructor( date : Date, 
                 phValue : number, 
                 comment : string, 
                 backflushInterval: number, 
                 chlorineValue : number, 
                 waterTemp : number, 
                 airTemp: number
                 ){

                    
            this.date = date.toLocaleDateString();
            this.phValue = phValue;
            this.comment = comment;
            this.backflushInterval = backflushInterval;
            this.chlorineValue = chlorineValue;
            this.waterTemp = waterTemp;
            this.airTemp = airTemp;
    }
}
