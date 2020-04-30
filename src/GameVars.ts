export class GameVars {

    public static scaleY: number;
    public static score: number;
    public static level: number;
    public static minMoves: number;
    public static cellStates: string[][];
    public static levelPassed: boolean;
    public static levelReset: boolean;
    public static moves: number;
    public static upperStripe_py: number;
    public static lowerStripe_py: number;
    public static stripesScale: number;
    public static lastFlipTime: number;
    public static cellsFlipping: boolean;
   
    public static formatTime(timeInSeconds: number): string { 

        const hours   = Math.floor(timeInSeconds / 3600); 
        const minutes = Math.floor((timeInSeconds - (hours * 3600)) / 60); 
        const seconds = timeInSeconds - (hours * 3600) - (minutes * 60); 

        let m = minutes.toString(); 
        let s = seconds.toString(); 

        if (minutes < 10) {  
            m = "0" + minutes; 
        } 

        if (seconds < 10) { 
            s = "0" + seconds; 
        } 

        return m + ":" + s; 
    } 

    public static formatNumber(value: number): string { 

        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
    } 
}
