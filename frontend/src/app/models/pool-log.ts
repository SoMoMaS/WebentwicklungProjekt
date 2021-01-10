export class PoolLog {

    constructor(private date : string, 
                private phValue : number, 
                private comment : string, 
                private backflushInterval: number, 
                private chlorineValue : number, 
                private waterTemp : number, 
                private airTemp: number)
                {
    }
}
