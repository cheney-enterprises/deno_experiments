
class PrimeSieve {
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

function main(sieveSize:number){

    const maxTime = 5000;
    let passes = 0;
    const startTime = performance.now();
    let currTime = startTime;
    let duration = 0;

    while(duration < maxTime){
        const sieve = new PrimeSieve(sieveSize);
        sieve.runSieve()
        if(sieve.validateResults()){
            passes+=1;
        } else {
            throw new Error("tests did not pass")
        } 
        currTime = performance.now();
        duration = currTime - startTime;
    }

    console.log(`passes: ${passes}; duration: ${duration / 1000}s; average time per pass: ${(duration/1000)/passes}s`)

}

const args = Number(Deno.args[0]);

if(args !== null || args[0]  !== undefined ){
    main(args)
} else {
    throw new Error('Command Line Argument must be a number')
}