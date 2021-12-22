const runs = Number(Deno.args[0])
const sieveSize = Deno.args[1] ?? 1e6

async function test(numberOfRuns:number){
    for (let i = 0; i < numberOfRuns; i++){
        console.log(`Process ${i+1} starting...`)
        const test = Deno.run({
            cmd: ['deno','run','--allow-hrtime','main.ts',`${sieveSize}`],
            stdout:'piped',
            stdin:'piped',
            stderr:'piped'
        })
        const decoder = new TextDecoder()
        const out = await test.output();
        const err = await test.stderrOutput();
        if(err.length === 0){
            console.log('writing file...')
            await Deno.writeFile('./test-results.txt',out,{append:true})
            console.log('file written.')
        } else {
            console.error(decoder.decode(err))
        }
        Deno.kill(test.pid,'SIGKILL');
        console.log(`Process ${i+1} completed`)
    }
}

if(runs){
    await test(runs)
} else {
    throw new Error(`Command Line Argument '${runs}' must be a number, and must be divisible by 10`)
}