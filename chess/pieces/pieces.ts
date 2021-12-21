import { IBoardPos } from "./pieces.d.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import * as Colors from "https://deno.land/std@0.118.0/fmt/colors.ts"



/**
 * lists the piece and color names, and provides the piece and color values, accessible 
 * by either calling either IPieces[key: string] or IPieces [value: number].
 * These are designed to be able to use binary manipulation to create and determine 
 * exact piece type/color using binary shifts (>>) and ORs (|)
 * @example const blackQueen = IPieces.black | IPieces.queen; // returns 22, or 10110. If it was white it would be 1110
 * const getColor = blackQueen >> 4 ? 'black' : 'white' // shifting a 5 digit (a black piece) binary 4 times would return 1 (truthy), shifting a 4 digit binary (a white piece) 4 times would return 0 (falsy)
 */ 
export enum IPieces {
    none = 0,
    pawn = 1,
    knight = 2,
    bishop = 3,
    rook = 4,
    king = 5,
    queen = 6,
    white = 8,
    black = 16
}

/**
 * Uses @IPieces to create binary IDs and match them with the equivalent string 
 * they will produce. Refer to the documentation on @IPieces
 */
export enum IPieceId {
    '   ' = 0,
    'PWN' = IPieces.black | IPieces.pawn,
    'KGT' = IPieces.black | IPieces.knight,
    'BSH' = IPieces.black | IPieces.bishop,
    'ROK' = IPieces.black | IPieces.rook,
    'KNG' = IPieces.black | IPieces.king,
    'QUN' = IPieces.black | IPieces.queen,
    'Pwn' = IPieces.white | IPieces.pawn,
    'Kgt' = IPieces.white | IPieces.knight,
    'Bsh' = IPieces.white | IPieces.bishop,
    'Rok' = IPieces.white | IPieces.rook,
    'Kng' = IPieces.white | IPieces.king,
    'Qun' = IPieces.white | IPieces.queen 
}




/**
 * Provides an initial starting board position and will track all board locations. 
 * provides all piece and board manipulation methods needed.
 * @method isBlack(value:number):boolean
 * @method pieceColor(value:number):string
 */
export class Pieces {
    #positions:IBoardPos = {
        Row: {    //Row 1
            1: Uint8Array.from([
                IPieces.white | IPieces.rook,
                IPieces.white | IPieces.knight,
                IPieces.white | IPieces.bishop,
                IPieces.white | IPieces.king,
                IPieces.white | IPieces.queen,
                IPieces.white | IPieces.bishop,
                IPieces.white | IPieces.knight,
                IPieces.white | IPieces.rook
            ]),
            //Row 2
            2: Uint8Array.from([
                IPieces.white | IPieces.pawn,
                IPieces.white | IPieces.pawn,
                IPieces.white | IPieces.pawn,
                IPieces.white | IPieces.pawn,
                IPieces.white | IPieces.pawn,
                IPieces.white | IPieces.pawn,
                IPieces.white | IPieces.pawn,
                IPieces.white | IPieces.pawn
            ]),
            //Row 3
            3: new Uint8Array(8),
            //Row 4
            4: new Uint8Array(8),
            //Row 5
            5: new Uint8Array(8),
            //Row 6
            6: new Uint8Array(8),
            //Row 7
            7: Uint8Array.from([
                IPieces.black | IPieces.pawn,
                IPieces.black | IPieces.pawn,
                IPieces.black | IPieces.pawn,
                IPieces.black | IPieces.pawn,
                IPieces.black | IPieces.pawn,
                IPieces.black | IPieces.pawn,
                IPieces.black | IPieces.pawn,
                IPieces.black | IPieces.pawn
            ]),
            //Row 8
            8: Uint8Array.from([
                IPieces.black | IPieces.rook,
                IPieces.black | IPieces.knight,
                IPieces.black | IPieces.bishop,
                IPieces.black | IPieces.king,
                IPieces.black | IPieces.queen,
                IPieces.black | IPieces.bishop,
                IPieces.black | IPieces.knight,
                IPieces.black | IPieces.rook
            ])},
        Column: {
            A: new Uint8Array(8),
            B: new Uint8Array(8),
            C: new Uint8Array(8),
            D: new Uint8Array(8),
            E: new Uint8Array(8),
            F: new Uint8Array(8),
            G: new Uint8Array(8),
            H: new Uint8Array(8)
        },
        Square: {
            
        }
    }
    #rowKeys = Object.keys(this.#positions.Row).reverse();
    #colKeys = Object.keys(this.#positions.Column);
    #squareKeys = Object.keys(this.#positions.Square);
    #alpha = "abcdefgh".toUpperCase().split('');

    constructor(){
        this.#init()
        return this;
    }
    /**
     * returns whether piece is black or not (white)
     */
    isBlack(value:number): boolean{
        return value >> 4 ? true : false;
    }
    /**
     * takes in a IPieceId equivalent number value, returns a colored, 
     * string-represented piece
     */
    pieceColor(value: number): string{
        const piece = IPieceId[value];
        if(value === 0){
            return piece;
        }
        return this.isBlack(value) ? Colors.bgBrightBlack(Colors.white(Colors.bold(piece))) : Colors.bgWhite(Colors.black(Colors.bold(piece)));
    }
    /**
     * takes in a known String key of IPieces and transform into numerical equivalent
     */
    getPieceNumber(value: keyof typeof IPieceId): number{
        return IPieceId[value]
    }
    /** 
     * Used to take in a 2-char alphanumeric string value 
     * and return the value for that square (i.e, A8 === {Chess Piece Value})
     */
    getPiecePositionValue(str: string): number{
        const strArr = str.split('');
        return this.#positions.Column[strArr[0]][Number(strArr[1])]
    }
    /**
     * sets new value of specific piece position
     */
    setPiecePositionValue(str:string,value:keyof typeof IPieceId):boolean{
        const strArr = str.toUpperCase().split('');
        const pieceVal = this.getPieceNumber(value);
        try {
            this.#positions.Column[strArr[0]][Number(strArr[1])] = pieceVal;
            return true;
        } catch (_error) {
            return false;
        }
    }
    /** 
     * Used in for-loops, 
     * takes in two numbers,
     * returns a string with Column Letter and Row Number (i.e, A8)
     */
    parsePiecePosition(columnLetterNum: number,rowNumber:number): string{
        return this.#alpha[columnLetterNum]+rowNumber
    }
    printPiece(column:number,row:number){
        return this.pieceColor(this.getPiecePositionValue(this.parsePiecePosition(column,row)))
    }
    /**
     * initiates columns based off of hard coded initialized rows
     */
    #initColumns(){
        const alpha = this.#alpha
        
        for(let col = 0;col < 8;col++){
            const tmp = [];
            for(let row = 8; row > 0;row--){
                tmp.push(this.#positions.Row[row][col])
            }
            this.#positions.Column[alpha[col]] = Uint8Array.from(tmp);
        }

        
    }
    /**
     * probably won't be used, in favor of:
     *     this.getPiecePositionValue(this.parsePiecePosition('A8'));
     * currently initiates an object with 64 individual piece positions, keyed to 
     * alphanumberic values (i.e., {'A8':22,'B8':18})
     */
    #initSquares(){
        // const column = this.#positions.Column;
        const rows = this.#positions.Row;
        const square = this.#positions.Square;
        for(let row = 8; row > 0;row--){
            for(let col = 0; col < this.#colKeys.length;col++){
                square[this.#colKeys[col]+row] = rows[row][col]
            }
        }
    }
    /**
     * initiates both columns and squares based off of hard coded starting rows
     */
    #init(){
        this.#initColumns();
        this.#initSquares();
    }
    /**
     * @test column initiation test
     */
    _testColumns(){
        const alpha = this.#alpha
        for(let idx = 0;idx < 8;idx++){
            const col = this.#positions.Column[alpha[idx]];
            const row = this.#positions.Row;
            Deno.test({
                name:`test column ${alpha[idx]}`,
                fn(): void {
                    assertEquals(
                        col,Uint8Array.from([
                            row[8][idx],
                            row[7][idx],
                            row[6][idx],
                            row[5][idx],
                            row[4][idx],
                            row[3][idx],
                            row[2][idx],
                            row[1][idx]
                        ])
                    )}
            })
        }
    }
    /**
     * @test square initiation test
     */
    _testSquares(){
        const square = this.#positions.Square;
        const column = this.#positions.Column;
        const alpha = this.#alpha
        alpha.forEach(ltr=>{
            const tmp: number[] = []
            for(let i = 8; i > 0;i--){
                tmp.push(square[`${ltr}${i}`])
            }
            Deno.test({
                name:`Test Square against column ${ltr}`,
                fn(): void {
                    assertEquals(Uint8Array.from(tmp),column[ltr])
                }
            })
        })
    }

    get obj(){
        return this.#positions
    }
}