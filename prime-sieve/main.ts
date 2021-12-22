import { PrimeSieve } from "./primesieve.ts";

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

    return `passes: ${passes}; duration: ${duration / 1000}s; average time per pass: ${(duration/1000)/passes}s`;

}

const args = Number(Deno.args[0]);

if(args !== null || args[0]  !== undefined ){
    console.log(main(args))
} else {
    throw new Error('Command Line Argument must be a number')
}