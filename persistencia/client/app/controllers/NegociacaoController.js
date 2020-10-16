class NegociacaoController{

    constructor(){       

       
       // criando um seletor tipo o do jquery

        const $ = document.querySelector.bind(document) //bins tem em qualquer função, ao definir o document.querySelector em uma varivael ele não pegou o contexto dessa função, por isso o uso do bind e dentro do bind o contexto de onde vem a função

        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')
        this._service = new NegociacaoService()
        // armazenando o this caso mude temos ele guardado
        const self = this

        //
         this._negociacoes = new Bind( 
             new Negociacoes(), 
             new NegociacoesView('#negociacoes'),
             'adiciona', 'esvazia'
             //model =>  this._negociacoesView.update(model)
            //  {

            //      get(target, prop, value,receiver){
            //      console.log(`${prop} guarda ${target[prop]}, receberá ${value}`)
            //      return Reflect.set(target, prop, value)
    
            //      if(typeof(target[prop])	==typeof(Function) && ['adiciona', 'esvazia'].includes(prop)){
                    
            //          return function() {
            //              console.log(`"${prop}" disparou a armadilha`);
            //              target[prop].apply(target,	arguments);
            //              self._negociacoesView.update(target)
            //          }
    
            //      }else{
            //          //	realizando	um	get	padrão
            //          return	target[prop];
            //      }	
            //  }
            //  }
        //} 

        
        );
        //

        

        // this._negociacoes = new Negociacoes((model) => 
        // {
        //     // O this aqui dentro foi alterdo
        //     this._negociacoesView.update(model)
        // }) 

        this._negociacoesView = new NegociacoesView('#negociacoes')

        this._negociacoesView.update(this._negociacoes)
        
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView('#mensagemView'),
            'texto',
            //model => this._mensagemView.update(model)
        )

        this._mensagemView = new MensagemView('#mensagemView')
        this._mensagemView.update(this._mensagem)

        this._init()
    }

    _init(){
        getNegociacaoDao()
        .then(dao	=>	dao.listaTodos())
        .then(negociacoes	=>	
            negociacoes.forEach(negociacao	=>	
                this._negociacoes.adiciona(negociacao)))
        .catch(err	=>	this._mensagem.texto	=	err)
    }

    apaga() {

        getNegociacaoDao()
        .then(dao => dao.apagaTodos())
        .then(() => {
            this._negociacoes.esvazia();
            this._mensagem.texto = 'Negociações apagadas com sucesso';
        })
        .catch(err => this._mensagem.texto = err);
    } 

    _limpaFormulario(){
        this._inputData.value = ''
        this._inputQuantidade.value = 1
        this._inputValor.value = 0.0
        this._inputData.focus()
    }

    // adiciona(event){

    //     try{

            

    //         event.preventDefault()
    //     //data é do ipo string e esta dando erro na class Negociação, precisamos converter 

    //     /** 1 forma de resolver a data 
    //      * let data = new Date(this._inputData.value.split('-'))
    //         console.log(data)
    //     */

    //     // outra maneira de resolver a data
    //    /** 
    //     * 2 maneira de resolver 
    //     * let data = new Date(this._inputData.value.replace(/-/g, ','))
    //     console.log(data)
    //    */

    //    /**3 maniera de resolver
    //     * ao inves de passar um array para new date, queremos passar parametros no constrtuctor do date
    //     */

    //     // let converter = new DataConverter() //não precisa mais pois os metodos possuim static
    //     // let data = converter.paraData(this._inputData.value) 

    //     // let negociacao = new Negociacao(data, parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value))

    //     // console.log(negociacao)

    //     // let diaMesAno = converter.paraTexto(negociacao.data)
    //     // console.log(diaMesAno)


                
    //     this._negociacoes.adiciona(this._criaNegociacao())
    //    // console.log(negociacao.data)       

    //     //let diaMesAno = DateConverter.paraTexto(negociacao.data)

    //     //console.log(this._negociacoes.paraArray())

    //     //this._negociacoesView.update(this._negociacoes)
        
    //     this._limpaFormulario()
    //     this._mensagem.texto = 'Negociação adicionada com sucesso'

    //    // this._limpaForm()
    //     //this._mensagemView.update(this._mensagem)

    //     }catch (err){
    //         console.log(err)
    //         console.log(err.stack)
    //         if(err instanceof DataInvalidaException){
    //             this.mensagem.texto = err.message
    //         }else{
    //             this.mensagem.texto = 'Um erro inesperado aconteceu chame o suporte'
    //         }
            
    //     }
        
        
    // }

    adiciona(event) {

        event.preventDefault();

        try {

            const negociacao = this._criaNegociacao();

            getNegociacaoDao()
            .then(dao => dao.adiciona(negociacao))
            .then(() => {
                this._negociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociação adicionada com sucesso';
                this._limpaFormulario();
            })
            .catch(err => this._mensagem.texto = err);

        } catch (err) {

            console.log(err);
            console.log(err.stack);

            if (err instanceof DataInvalidaException) {

                this._mensagem.texto = err.message;

            } else {

                this._mensagem.texto = 'Um erro não esperado aconteceu. Entre em contato com o suporte';
            }
        }
    }

    _criaNegociacao(){
        return new Negociacao(
            DateConverter.paraData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        )
    }

    // importaNegociacoes(){
    //     // const negociacoes = [] 

    //     // this._service.obterNegociacoesDaSemana()
    //     // .then(semana =>{ 
    //     //     negociacoes.push(...semana)
    //     //     // negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao))            
    //     //     // this._mensagem.texto = 'Negociaçoes importadas com successo'
    //     //     return this._service.obtemNegociacoesDaSemanaAnterior()
    //     // })
    //     // .then(anterior => {
    //     //     negociacoes.push(...anterior)
    //     //     negociacoes.forEach(negociacao	=>	this._negociacoes.adiciona(negociacao))
    //     //     this._mensagem.texto	=	'Negociações	importadas	com	sucesso'
    //     //     return this._service.obtemNegociacoesDaSemanaRetrasada()
    //     // })
    //     // .then(retrasada	=>	{
    //     //         negociacoes.push(...retrasada);
    //     //         negociacoes.forEach(negociacao	=>	this._negociacoes.adiciona(negociacao));
    //     //         this._mensagem.texto	=	'Negociações	importadas	com	sucesso';
    //     // })
    //     // .catch(err	=>	this._mensagem.texto		=	err)

    //     // return Promise.all([
    //     //     this._service.obtemNegociacoesDaSemana(),
    //     //     this._service.obtemNegociacoesDaSemanaAnterior(),
    //     //     this._service.obtemNegociacoesDaSemanaRetrasada()
    //     // ])
    //     // .then(periodo	=>	{
    //     //     console.log(periodo)
    //     //     periodo	=	periodo.reduce((novoArray,	item)	=>	novoArray.concat(item),	[])
    //     //     .forEach(negociacao	=>	this._negociacoes.adiciona(negociacao));
    //     //     this._mensagem.texto	=	'Negociações	importadas	com	sucesso';
    //     // })
    //     // .catch(err	=>	this._mensagem.texto =	err);

    //     this._service
    //     .obtemNegociacoesDoPeriodo()
    //     .then(negociacoes =>{
    //         negociacoes
    //         .filter(novaNegociacao => !this._negociacoes.paraArray().some(negociacaoExistente => 
    //             novaNegociacao.equals(negociacaoExistente)))
    //         .forEach(negociacao => this._negociacoes.adiciona(negociacao))
    //         this._mensagem.texto = "Negociaçoes do periodo importadas com sucesso"
    //     })
    //     .catch(err => this._mensagem.texto = err)        
    // }

    importaNegociacoes() {

        this._service
            .obtemNegociacoesDoPeriodo()
            .then(negociacoes => {

                negociacoes.filter(novaNegociacao =>

                    !this._negociacoes.paraArray().some(negociacaoExistente =>

                        novaNegociacao.equals(negociacaoExistente)))

                    .forEach(negociacao => this._negociacoes.adiciona(negociacao));

                this._mensagem.texto = 'Negociações do período importadas com sucesso';
            })
            .catch(err => this._mensagem.texto = err);
    }
}


function covertendoAjax(banco){
    JSON.parse(banco)
    .map(objeto => { 
        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
    })
    .forEach(negociacoes => this._negociacoes.adiciona(negociacoes))

    this._mensagem.texto = "Negociaçoes importadas com successo"
}