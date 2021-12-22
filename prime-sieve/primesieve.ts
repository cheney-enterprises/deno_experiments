
export class PrimeSieve {
    #root:number;
    #sieveSize: number;
    #buff: Uint8Array;

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
        10000000000: 455052511,
    }

    constructor(sieveSize:number){
        this.#root = Math.sqrt(sieveSize);
        this.#sieveSize = sieveSize;
        if(sieveSize % 10  === 0){
            this.#buff = new Uint8Array(sieveSize);
        } else {
            throw new Error("sieveSize must be a multiple of 10")
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

    countResults(){
        let ctr = 1;

        for (let curr = 3; curr < this.#sieveSize; curr += 2) {
            if (!this.#buff[curr]){ 
                ctr++;
            }
        }

        return ctr
    }

    validateResults(){
        return this.countResults() === this.#knownNumberOfValues[this.#sieveSize];
    }
}