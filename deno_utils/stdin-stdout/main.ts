export function stdout(value: string | boolean | number): void{
    Deno.stdout.writeSync(new TextEncoder().encode(value.toString()));
}

export function stdin():string{
    const bytes: number[] = [];
    while(true){
        const buffer = new Uint8Array(1);
        const read = Deno.stdin.readSync(buffer);
        if(!read){
            break;
        }
        const currentByte = buffer[0];
        if(currentByte === 10) break;
        bytes.push(currentByte)
    }
    const final = Uint8Array.from(bytes);
    return new TextDecoder().decode(final);
}

export function prompt(message:string){
    stdout(message+" ")
    return stdin();
}