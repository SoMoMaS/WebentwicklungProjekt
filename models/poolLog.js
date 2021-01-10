export class PoolLog{

    constructor(date, phValue, comment, backflushInterval, chlorineValue, waterTemp, airTemp){
        this.date = date;
        this.phValue = phValue;
        this.comment = comment;
        this.backflushInterval = backflushInterval;
        this.chlorineValue = chlorineValue;
        this.waterTemp = waterTemp;
        this.airTemp = airTemp;
    }
}