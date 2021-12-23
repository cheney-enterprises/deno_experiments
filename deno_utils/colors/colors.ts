import * as C from "https://deno.land/std@0.118.0/fmt/colors.ts"
declare global {
    interface String {
        bgBlack: string,
        bgBlue: string,
        bgBrightBlack: string,
        bgBrightBlue: string,
        bgBrightCyan: string,
        bgBrightGreen: string,
        bgBrightMagenta: string,
        bgBrightRed: string,
        bgBrightWhite: string,
        bgBrightYellow: string,
        bgCyan: string,
        bgGreen: string,
        bgMagenta: string,
        bgRed: string,
        bgRgb24: string,
        bgRgb8: string,
        bgWhite: string,
        bgYellow: string,
        black: string,
        blue: string,
        Bold: string, // note that String.prototypw already has a bold function, so this uses Bold
        brightBlack: string,
        brightBlue: string,
        brightCyan: string,
        brightGreen: string,
        brightMagenta: string,
        brightRed: string,
        brightWhite: string,
        brightYellow: string,
        cyan: string,
        dim: string,
        getColorEnabled: string,
        gray: string,
        green: string,
        hidden: string,
        inverse: string,
        italic: string,
        magenta: string,
        red: string,
        reset: string,
        rgb24: string,
        rgb8: string,
        setColorEnabled: string,
        strikethrough: string,
        stripColor: string,
        underline: string,
        white: string,
        yellow: string
    }
}

export default (function(){
function addProperty(color: keyof typeof C,fn: Function){
    let col = ''
    if(color === 'bold'){
        col = 'Bold'
    } else {
        col = color
    }
    Object.defineProperty(String.prototype,col,{
        get():string{
            const self = fn(this);
            return self as string;
        }
    });
}

const obj: Record<string,Function> = {}

Object.keys(C).forEach(function(el){
    const a = el as keyof typeof C;
    addProperty(a,C[a]);
    obj[a] = C[a];
})})();