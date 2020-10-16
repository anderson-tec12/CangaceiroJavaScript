var campos = [
    document.querySelector('#data'),
    document.querySelector('#valor'),
    document.querySelector('#quantidade'),
]

console.log('a', campos)

var tbody = document.querySelector('table tbody')

document.querySelector('.form').addEventListener('submit',function(event){
    //cancelando o submit
        event.preventDefault()

    //alert('oi')
    var tr = document.createElement('tr')

    campos.forEach(function(campo){
        //cria uma td sem dados
        var td = document.createElement('td')

        //colocando um valor 
        td.textContent = campo.value

        //aplicando na tr 
        tr.appendChild(td)
    })

    //nova TD que pegar o volume de negociação
    var tdVolume = document.createElement('td')
    tdVolume.textContent = campos[1].value * campos[2].value
    tr.appendChild(tdVolume)

    //adionando a tr pronto a tbody 
    tbody.appendChild(tr)

    //limpa o campo data 
    campos[0].value = ''
    //limpa o campo quantidade
    campos[1].value = ''
    //limpa o campo valor
    campos[2].value = ''

    //foca automaticamente no campo data
    campos[0].focus()

})