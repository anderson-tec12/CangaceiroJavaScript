//capitulo 2
class  Negociacao{
    constructor(_data, _quantidade, _valor){
       /* this._data = data.getTime()
        this._quantidade = quantidade
        this._valor = valor
        Object.freeze(this) //congelando direto na class
        */

        //menos verboso cria uma coipia do objeto
        /*
             Object.assign(this,{_data:new Date(data.getTime()),_quantidade:quantidade,_valor:valor})
        */
       
        // diminuindo ainda mais quando a propriedade tem o mesmo nome da variavel podemos  passar apenas o nome da variavel que o js vai entender que é nome:valor

        Object.assign(this,{_quantidade, _valor})
        this._data = new Date(_data.getTime())
        Object.freeze(this)
    }

    /** metodos */

    get volume(){
        return this._quantidade * this._valor
    }

    get data(){
        return new Date(this._data.getTime()) // get.Time() retorna um numero long com a representação da data
    }

    get quantidade(){
        return this._quantidade
    }

    get valor(){
        return this._valor
    }

    equals(negociacao)	{
        // return this.data.getDate()	==	negociacao.data.getDate()	
        //         &&	this.data.getMonth() ==	negociacao.data.getMonth()
        //         &&	this.data.getFullYear()	==	negociacao.data.getFullYear()
        //         &&	this.quantidade	==	negociacao.quantidade 
        //         &&	this.valor	==	negociacao.valor;

        return JSON.stringify(this)	==	JSON.stringify(negociacao)
    }
   
}