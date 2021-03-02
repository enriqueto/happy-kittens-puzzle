export class GameVars {

    public static scaleY: number;

    // en este array se guardan los mejores resultados del nivel, es 0 si está desbloqueado pero no superado y -1 si está bloqueado
    public static levelsBestResults: number [];
    public static currentLevel: number;
    public static achievedLevel: number;
    public static cellStates: string[][];
    public static levelPassed: boolean;
    public static moves: number;
    public static upperStripe_py: number;
    public static lowerStripe_py: number;
    public static stripesScale: number;
    public static lastFlipTime: number;
    public static gameFinished: boolean;
    public static congratulationsMessageShown: boolean;
    public static cellsFlipping: boolean;
    public static time: number;
    public static score: number;

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

    public static getLocalStorageData(key: string): string {

        try {
            var value: string = localStorage.getItem(key);

            if (value !== null) {
                return value;
            } else {
                return "";
            }
        }
        catch {
          //  console.log("local storage not supported");
            return "";
        }
    }

    public static setLocalStorageData(key: string, value: any): void {

        try {
            localStorage.setItem( key, value);
        }
        catch {
           // console.log("local storage not supported");
        }
    }
}
