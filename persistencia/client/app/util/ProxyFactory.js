class ProxyFactory{
    /*
        objeto: Alvo do proxy
        props: array com os metodos que vão ser interceptados
        armadilha: a função que deve ser executada
    */
    static create(objeto, props, armadilha){
        return new Proxy(objeto, {
            get(target, prop, receiver){
                if(typeof(target[prop]) == typeof(Function) && props.includes(prop)){
                    return function(){
                        console.log(`"${prop}" disparou a armadilha`)
                        target[prop].apply(target, arguments);
                        //executa a armadilha que recebe
                        //objeto  original
                        armadilha(target)
                    }
                }else{
                    return target[prop]
                }
            },

            set(target, prop, value, receiver){
                const updated = Reflect.set(target, prop, value)
                //só executa a armadiha
                // se fizer parte da lista de props
                if(props.includes(prop)) armadilha(target)
                return updated
            }

            
        })//fim new Proxy
    }


    static _ehFuncao(fn){
        return typeof(fn) == typeof(Function)
    }
}