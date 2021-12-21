interface IBoardRow {
    [index:number]:Uint8Array
}
interface IBoardCol {
    [index: string]:Uint8Array
}
interface IBoardSquare {
    [index:string]:number
}
export interface IBoardPos  {
    Row:IBoardRow,
    Column:IBoardCol,
    Square:IBoardSquare
}