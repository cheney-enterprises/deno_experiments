import * as C from "https://deno.land/std@0.118.0/fmt/colors.ts"

// export const colors = Object.create(C);

interface Rgb {
    r: number,
    g: number,
    b: number
}

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
        bgRgb24: (color: number | Rgb) => string,
        bgRgb8: (color: number) => string,
        bgWhite: string,
        bgYellow: string,
        black: string,
        blue: string,
        Bold: string, // note that String.prototype already has a bold function, so this uses Bold
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
        rgb24: (color: number | Rgb) => string,
        rgb8: (color: number)=> string,
        setColorEnabled: (value: boolean) => void,
        strikethrough: string,
        stripColor: string,
        underline: string,
        white: string,
        yellow: string
    }
}

export default (function(){
//deno-lint-ignore ban-types
function addProperty(color: keyof typeof C,fn: Function){
    let col = ''
    if(color === 'bold'){
        col = 'Bold'
    } else {
        col = color
    }
    if(col.toLowerCase().includes('rgb')){
        Object.defineProperty(String.prototype,col,{
            value: function(color: number | Rgb){
                return fn(this,color)
            }
        });
    }else if(color === 'setColorEnabled'){
        Object.defineProperty(String.prototype,col,{
            value: fn
        });
    } else {
        Object.defineProperty(String.prototype,col,{
            get():string{
                const self = fn(this);
                return self as string;
            }
        });
    }
        
}

Object.keys(C).forEach(function(el){
    const a = el as keyof typeof C;
    addProperty(a,C[a]);
})})();