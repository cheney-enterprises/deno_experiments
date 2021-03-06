import "https://raw.githubusercontent.com/cheney-enterprises/deno_experiments/main/deno_utils/colors/colors.ts";


export class PrimeSieve {
    #root:number;
    #sieveSize: number;
    #buff: Uint8Array;
    #results: number[] = [];
    #sieveRun: boolean = false;

    #knownNumberOfValues: {[size:number]:number }= {
        10: 4,
        100: 25,
        1000: 168,
        10000: 1229,
        100000: 9592,
        1000000: 78498,
        10000000: 664579,
        100000000: 5761455,
        1000000000: 50847534,
        // 10000000000: 455052511,
    }

    constructor(sieveSize:number){
        if(sieveSize > (Math.pow(2,32)-1)) throw RangeError("Sieve Size is out of bounds")
        this.#root = Math.sqrt(sieveSize);
        this.#sieveSize = sieveSize;
        if(sieveSize % 10  === 0){
            this.#buff = new Uint8Array(sieveSize);
        } else {
            throw EvalError("sieveSize must be a multiple of 10")
        }
        
    }

    runSieve(){
        let factor = 3
        while(factor <= this.#root){
            for(let curFactor = factor; curFactor <= this.#sieveSize; curFactor+=2){
                if(!this.#buff[curFactor]){
                    factor = curFactor;
                    break;
                }
            }

            for(let oddComposite = factor * factor; oddComposite <= this.#sieveSize; oddComposite+=factor*2){
                this.#buff[oddComposite] = 1;
            }

            factor += 2
        }
        this.#sieveRun = true;
    }

    get results(){
        // cache results 
        if(this.#results.length === 0){
            this.#results.push(2);
            for (let curr = 3; curr < this.#sieveSize; curr += 2) {
                if (!this.#buff[curr]){ 
                    this.#results.push(curr);
                }
            }
        }
        return this.#results;
    }

    countResults(){
        return this.results.length;
    }

    validateResults(){
        if(!this.#sieveRun){
            this.runSieve();
        }
        if(this.#knownNumberOfValues[this.#sieveSize]){
            return this.countResults() === this.#knownNumberOfValues[this.#sieveSize]
        }
        const key = Number(Object.keys(this.#knownNumberOfValues).reverse().filter(el=>Number(el) < this.#sieveSize)[0]);
        
        const string = 
            `Be aware that validating this result may not be 100% accurate, as you provided a sieve size (${String(this.#sieveSize).green}) that is !== a known value.\nThis result strictly checks that the number of primes counted (${String(this.countResults()).green}) are greater than the next lowest known value (${('{'+key+':'+this.#knownNumberOfValues[key]+'}').green}).\n\nIf you want to be sure that this algoritm is accurate, run it with one of the following keys as a number value in runSieve: \n${JSON.stringify(this.#knownNumberOfValues,null,2).green}
            
            `;
        
        console.warn(string.brightYellow.Bold.italic);

        return this.countResults() >= this.#knownNumberOfValues[key];
    }
}