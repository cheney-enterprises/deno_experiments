export type { Tree, Node };

interface ISharedTreeProps {
    get root(): Node
    get height(): number
    get name(): string
}

interface ITree extends ISharedTreeProps {
    search(value:string):Node
}

interface INode extends ISharedTreeProps {
    get value(): string
    get action(): Map<string,Function>
    get isRoot(): boolean
    get parent(): Node | Tree
    get children(): Set<Node>
    addChild(node:Node):void
    
}

class Tree implements ITree {
    #root: Node;
    #height: number;
    #name: string;
    constructor(root: Node,name:string){
        this.#root = root;
        this.#height = root.height;
        this.#name = name || "<Anonymous Tree>";
        root._isRoot = true;
        root._parent = this;
    }
    get height(): number {
        return this.#height;
    }
    set _height(number:number){
        this.#height = number;
    }
    get root(): Node {
        return this.#root;
    }
    get name(): string {
        return this.#name;
    }
    
    search(value: string): Node {
        return this.#root
    }
}

class Node implements INode {
    #children:Set<Node>;
    #action: Map<string, Function>;
    #value: string;
    #isRoot: boolean;
    #root: Node;
    #height: number;
    #name: string;
    #parent: Node | Tree = this;

    constructor(value?:string,name?:string){
        this.#action = new Map<string,Function>();
        this.#value = value || "";
        this.#isRoot = false;
        this.#children = new Set<Node>();
        this.#root = this;
        this.#height = 0;
        this.#name = name || this.#value;
    }
    addChild(node: Node): void {
        this.#children.add(node);
        node.#parent = this;
        node.#root = this.#root;
        node.#isRoot = false;
        this.#height = this.#height < node.#height ? node.#height + 1 : this.#height;
        this.#parent._height = this.#parent.height < this.height ? this.height + 1 : this.#parent.height;
    }
    search(value: string): Node {
        return this.#root;
    }
    get children() {
        return this.#children;
    }
    get root(): Node {
        return this.#root
    }
    get isRoot(): boolean {
        return this.#isRoot;
    }
    set _isRoot(bool: boolean){
        this.#isRoot = bool;
    }
    get height(): number {
        return this.#height;
    }
    set _height(number:number){
        this.#height = number;
    }
    get action(): Map<string, Function> {
        return this.#action;
    }
    get value(): string {
        return this.#value;
    }
    get parent(): Node | Tree {
        return this.#parent;
    }
    set _parent(parent:Node|Tree){
        this.#parent = parent;
    }
    get name(): string {
        return this.#name;
    }
}

let testNode = new Node("/");

let testTree = new Tree(testNode,'testTree');

testNode.addChild(new Node('/test'))

testNode.addChild(new Node('/graph'))

console.log("name: "+testNode.children)