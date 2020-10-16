class Negociacoes{
    //constructor(armadilha){
    constructor(){
        this._negociacoes = []
        //this._armadilha  = armadilha
        Object.freeze(this)
    }

    adiciona(negociacao){
        this._negociacoes.push(negociacao)
        //this._armadilha(this)
    }

    paraArray(){
        return [].concat(this._negociacoes)
    }

    get volumeTotal(){
            let total = 0 
            for(let i = 0; i < this._negociacoes.length; i++){
                total+=this._negociacoes[i].volume
            }

            return total
    }

    esvazia(){
        this._negociacoes.length = 0
        //this._armadilha(this)
    }
}