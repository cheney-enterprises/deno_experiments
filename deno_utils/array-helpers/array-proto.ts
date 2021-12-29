declare global {
    interface Array<T> {
        delete: (...index: number[])=>this;
    }
}

export default Object.defineProperty(Array.prototype,'delete',{
    value: function(...index: number[]){
        index = index.sort();
        if(index[index.length-1] > this.length || index[0] < 0){
            return false;
        }
        if(index.length === 1){
                for(let i = index[0];i<this.length;i++){
                    this[i] = this[i+1];
                }
                this.length -= 1;
                return true;
        } else {
            const set = new Set(index).values();
            let ctr = 0;
            for(const idx of set){
                this.delete(idx-ctr);
                ctr++;
            }
            return true;
        }
    }
})