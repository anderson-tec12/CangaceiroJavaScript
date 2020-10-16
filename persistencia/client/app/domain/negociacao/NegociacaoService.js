class NegociacaoService{

    constructor(){
        this._http	=	new	HttpService()
    } 
        // obterNegociacoesDaSemana(){
        //     return this._http
        //     .get('negociacoes/semana')
        // 	.then(dados	=> dados.map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor))
        //     , err=>{
        //             throw new Error('Não	foi	possível	obter	as	negociações');
        // 		    }
        // 	);
        // //}


        //     // return new Promise((resolve, reject) =>{
        //     //     //iniciando uma requisição AJAX 
        //     //     const xhr = new XMLHttpRequest()
        //     //     xhr.open('GET', 'negociacoes/semana')

        //     //     //configurando a requisicao ajax
        //     //     xhr.onreadystatechange = () =>{
        //     //         //verificando o estado 
        //     //         if(xhr.readyState == 4 ){
        //     //             if(xhr.status == 200){
        //     //                 console.log('Obtendo  as negocições do servidor ')
        //     //                 console.log(xhr.responseText)
        //     //                 console.log(JSON.parse(xhr.responseText))
        //     //                 //covertendoAjax(xhr.responseText)

        //     //                 const negociacoes = JSON.parse(xhr.responseText)
        //     //                     .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
        //     //                     //.forEach(negociacao => this._negociacoes.adiciona(negociacao))

        //     //                     //this._mensagem.texto = "Negociaçoes importadas com successo"
        //     //                     //cb(null, negociacoes)
        //     //                     resolve(negociacoes)
        //     //             }else{
        //     //                 console.log('Não foi possivel obter as negociações da semana')
        //     //                 reject('Não	foi	possível	obter	nas	negociações	da	semana')
        //     //             }
        //     //         }
        //     //     }
        //     //     xhr.send() //executa a requisição configurada
        //     // })
        // }

    obtemNegociacoesDaSemana() {
    
        return this._http
            .get('negociacoes/semana')
            .then(
                dados => 
                    dados.map(objeto => 
                        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                ,
                err => {

                    throw new Error('Não foi possível obter as negociações da semana');
                }
            );
    }

    obtemNegociacoesDaSemanaAnterior()	{
        return this._http
        .get('negociacoes/anterior')
        .then(dados	=>dados.map(objeto => new	Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
        ,err	=>	{
        //	ATENÇÃO	AQUI!
            throw new Error('Não	foi	possível	obter	as	negociações	da	semana	anterior');
        });
    }

    obtemNegociacoesDaSemanaRetrasada()	{
        return this._http
            .get('negociacoes/retrasada')
            .then(dados	=> dados.map(objeto =>	new	Negociacao(new Date(objeto.data),objeto.quantidade,	objeto.valor))
            ,err	=>	{
                    throw new Error('Não	foi	possível	obter	as	negociações	da	semana	retrasada');
                });
    }

    // obtemNegociacoesDoPeriodo(){
    //     return	Promise.all([
    //         this.obtemNegociacoesDaSemana(),
    //         this.obtemNegociacoesDaSemanaAnterior(),
    //         this.obtemNegociacoesDaSemanaRetrasada()
    //     ])
    //     .then(periodo	=>	periodo
    //         .reduce((novoArray,	item)	=>	novoArray.concat(item),	[])
    //         .sort((a,b) => b.data.getTime() - a.data.getTime())  
    //     )
    //     .catch(err	=>	{
    //         console.log(err);
    //         throw new Error('Não	foi	possível	obter	as	negociações	doperíodo')
    //     })
    // }

    obtemNegociacoesDoPeriodo() {
        
        return Promise.all([
            this.obtemNegociacoesDaSemana(),
            this.obtemNegociacoesDaSemanaAnterior(),
            this.obtemNegociacoesDaSemanaRetrasada()
        ])
        .then(periodo => periodo
            .reduce((novoArray, item) => novoArray.concat(item), [])
            .sort((a, b) => b.data.getTime() - a.data.getTime())
        )
        .catch(err => {

            console.log(err);
            throw new Error('Não foi possível obter as negociações do período')
        });
    } 
} 
