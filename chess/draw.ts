//deno-lint-ignore-file no-unused-vars
import { Pieces, IPieces, IPieceId } from "./pieces/pieces.ts"
import { prompt,stdout } from "../deno_utils/stdin-stdout.ts"
import { assertEquals, equal, assert } from "https://deno.land/std/testing/asserts.ts";

function log(...data: unknown[]):void{
    data.forEach(el=>console.log(el))
}
/**
 * minimum number of rows/columns JUST for the 
 * board. @TODO: check 
 */


enum minimumConsoleSizeBoard {
    columns = 90,
    rows = 33
}

const boardConst = {
    top:"---------",
    side:" |",
    space:"        ",
    piece: function (piece:string): string{
        return `  ${piece}   `;
    }
}

function printBorder(){
    stdout(boardConst.space+" ")
    for(let k = 9;k > 0;k--){
        stdout(boardConst.top)
    }
    stdout('\n')
}

function drawRow(ctx:Pieces){
    // draw 8 rows
    for(let row = 0;row < 8;row++){
        drawSubRow(ctx,row)
    }
    printBorder()
}

function drawSubRow(ctx:Pieces,row:number){
    for(let subRow = 0; subRow < 4;subRow++){
        switch (subRow){
            case 0:
                printBorder()
                break;
            case 2:
                // draw subrow columns that have pieces assigned (only subrow 2)
                drawColumn(ctx,row)
                break;
            default:
                drawColumn()
                break;
        }
    }
}


/**
 * draw our columns inside the current subrow
 * @param ctx if we are drawing a subrow that contains pieces, include the pieces context we are working with inside draw board
 * @param row if we are drawing a subrow that contains pieces, include the row we are currently on using the row variable inside draw board
 */
function drawColumn(ctx?:Pieces,row?:number){
    for(let column = 0;column < 9 ;column++){
        if(ctx !== undefined && row !== undefined) {   
            switch (column){
                case 0:
                    drawPadding();
                    break;
                case 8:
                    stdout(boardConst.side+boardConst.piece(ctx.printPiece(column-1,row))+boardConst.side+"\n");
                    break;
                default:
                    stdout(boardConst.side+boardConst.piece(ctx.printPiece(column-1,row)));
                    break;
            }
        } else {
            switch (column){
                case 0:
                    drawPadding()
                    break;
                case 8:
                    stdout(boardConst.side+boardConst.space+boardConst.side+"\n");
                    break;
                default:
                    stdout(boardConst.side+boardConst.space);
                    break;
            }
        }
    }
}

function drawPadding(){
    stdout(boardConst.space)
}



function drawBoard(pieces:Pieces){
    const {columns,rows} = Deno.consoleSize(Deno.stdout.rid)
    if(columns >= minimumConsoleSizeBoard.columns && rows >= minimumConsoleSizeBoard.rows){
        drawRow(pieces)
    } else {
        const answer = prompt("Please increase the size of your screen and try again. Reply with [done] to continue: ")
        if(answer === "done" || answer === "Done" || answer === "DONE" || answer === "y" || answer === "Y" 
            && columns >= minimumConsoleSizeBoard.columns && rows >= minimumConsoleSizeBoard.rows){
            drawBoard(pieces)
        } else {
            return;
        }
    }
}

drawBoard(new Pieces())


console.log(Deno.consoleSize(Deno.stdout.rid))
console.log(minimumConsoleSizeBoard)