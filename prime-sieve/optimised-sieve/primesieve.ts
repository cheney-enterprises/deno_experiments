class PrimeSieve {
    #root:number;
    #sieveSize: number;
    #buff: Uint8Array;
    #results: number[] = [];

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
        if(this.#knownNumberOfValues[this.#sieveSize]){
            return this.countResults() === this.#knownNumberOfValues[this.#sieveSize]
        }
    }
}



    const maxTime = 5000;
    let passes = 0;
    const startTime = performance.now();
    let currTime = startTime;
    let duration = 0;

    while(duration < maxTime){
        const sieve = new PrimeSieve(1e6);
        sieve.runSieve()
        currTime = performance.now();
        duration = currTime - startTime;
        if(sieve.validateResults()){
            passes+=1;
        } else {
            throw new Error("tests did not pass")
        } 
        
    }

    console.log(`passes: ${passes}; duration: ${duration / 1000}s; average time per pass: ${(duration/1000)/passes}s`);
