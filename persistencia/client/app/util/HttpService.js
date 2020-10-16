class HttpService{
    get(url){
        return new Promise((resolve, reject) =>{
            //iniciando uma requisição AJAX 
            const xhr = new XMLHttpRequest()
            xhr.open('GET', url)

            //configurando a requisicao ajax
            xhr.onreadystatechange = () =>{
                //verificando o estado 
                if(xhr.readyState == 4 ){
                    if(xhr.status == 200){
                        console.log('Obtendo  as negocições do servidor ')
                        console.log(xhr.responseText)
                        console.log(JSON.parse(xhr.responseText))
                        //covertendoAjax(xhr.responseText)

                        const negociacoes = JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                            //.forEach(negociacao => this._negociacoes.adiciona(negociacao))

                            //this._mensagem.texto = "Negociaçoes importadas com successo"
                            //cb(null, negociacoes)
                            resolve(negociacoes)
                    }else{
                        console.log('Não foi possivel obter as negociações da semana')
                        reject('Não	foi	possível	obter	nas	negociações	da	semana')
                    }
                }
            }
            xhr.send() //executa a requisição configurada
        })
    }
}