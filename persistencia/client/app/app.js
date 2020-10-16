const controller = new NegociacaoController()

// document.querySelector('.form').addEventListener('submit', function(event){
//     controller.adiciona(event)
// })

// reduzindo o codigo acima

const $ = document.querySelector.bind(document)

$('.form').addEventListener('submit',controller.adiciona.bind(controller))
$('#botao-apaga').addEventListener('click', controller.apaga.bind(controller))
$('#botao-importa').addEventListener('click', controller.importaNegociacoes.bind(controller))