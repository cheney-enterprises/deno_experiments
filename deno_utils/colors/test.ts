import "https://raw.githubusercontent.com/cheney-enterprises/deno_experiments/main/deno_utils/colors/colors.ts";

let str = 'rgb'
str.setColorEnabled(false)
console.log(str.red)
str.setColorEnabled(true)
console.log(str.red)

console.log(str.rgb24({r:76,g:147,b:255}))