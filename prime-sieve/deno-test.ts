import * as Colors from "https://deno.land/std@0.118.0/fmt/colors.ts";

const path = Deno.args.includes('-p') ? Deno.args[Deno.args.indexOf('-p')+1] : Deno.args.includes('--path') ? Deno.args[Deno.args.indexOf('--path')+1] : './test-results.txt';
const runs = Deno.args.includes('-r') ? Number(Deno.args[Deno.args.indexOf('-r')+1]) : Deno.args.includes('--runs') ? Number(Deno.args[Deno.args.indexOf('--runs')+1]) : 1;
const size = Deno.args.includes('-s') ? Number(Deno.args[Deno.args.indexOf('-s')+1]) : Deno.args.includes('--sieve-size') ? Number(Deno.args[Deno.args.indexOf('--sieve-size')+1]) : 1e6;
const help = Deno.args.includes('-h') || Deno.args.includes('--help')
const noFile = Deno.args.includes('--no-file-output')

async function test(numberOfRuns:number){
    for (let i = 0; i < numberOfRuns; i++){
        console.log(`Process ${i+1} starting...`)
        const test = Deno.run({
            cmd: ['deno','run','--allow-hrtime','main.ts',`${size}`],
            stdout:'piped',
            stdin:'piped',
            stderr:'piped'
        })
        const decoder = new TextDecoder();
        const out = await test.output();
        const err = await test.stderrOutput();
        if(err.length === 0){
            if(noFile){
                console.log('\n'+decoder.decode(out));
            } else {
                console.log('writing file...');
                await Deno.writeFile(path,out,{append:true});
                console.log('file written.');
            }
            
        } else {
            console.error(decoder.decode(err));
        }
        Deno.kill(test.pid,'SIGKILL');
        console.log(`Process ${i+1} completed`);
    }
}

if(help){
    console.log(`\n${Colors.yellow("The following are the commands that you can provide to prime sieve cli:")} \n\n   ${Colors.green("--no-file-output")} : an optional flag - will log the results to the console, will not write to a file.\n\n   ${Colors.green("-p")} OR ${Colors.green("--path")} : an optional flag - the local path to the output file. Default is './prime-results.txt'.\n\n   ${Colors.green("-r")} OR ${Colors.green("--runs")} : an optional flag - the number of times the sieve is run. A default value of 1 is provided.\n\n   ${Colors.green("-s")} OR ${Colors.green("--sieve-size")} : an optional flag - the max sieve size (the limit to calculate primes to). A default value of 1e6 (One Million) is provided.`)
} else {
    if(runs){
        await test(runs)
    } else {
        throw new Error(`Command Line Argument '${runs}' must be a number, and must be divisible by 10`)
    }
}