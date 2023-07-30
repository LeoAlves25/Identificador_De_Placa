const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numeros = '0123456789';
const resultados = ["Placa do Paraná.", "Placa do Rio Grande do Sul.", "Placa de Santa Catarina.", "Estado não pertence ao Sul."]

const sul = {
    parana: {
        1: {
            comeco: 'AAA',
            fim: 'BEZ'
        },
        2: {
            comeco: 'RHA',
            fim: 'RHZ'
        }
    },
    RioGrandeDoSul: {
        1: {
            comeco: 'IAQ',
            fim: 'JDO'
        }
    },
    SantaCatarina: {
        1: {
            comeco: 'LWR',
            fim: 'MMM'
        },
        2: {
            comeco: 'OKD',
            fim: 'OKH'
        },
        3: {
            comeco: 'QHA',
            fim: 'QJZ'
        },
        4: {
            comeco: 'QTK',
            fim: 'QTM'
        },
        5: {
            comeco: 'RAA',
            fim: 'RAJ'
        },
        6: {
            comeco: 'RDS',
            fim: 'REB'
        },
        7: {
            comeco: 'RKW',
            fim: 'RLP'
        },
        8: {
            comeco: 'RXK',
            fim: 'RYI'
        }
    }
}

var textPlaca = document.getElementById('textPlaca');
var resultDiv = document.getElementById('resultado');
var textResult = document.getElementById('resultadoPlaca');

function gerarPlaca() {

    var placa = '';
    for (var i = 0; i < 3; i++) {
        var letraAleatoria = letras.charAt(Math.floor(Math.random() * letras.length));
        placa += letraAleatoria;
    }

    placa += numeros.charAt(Math.floor(Math.random() * numeros.length));
    placa += letras.charAt(Math.floor(Math.random() * letras.length));

    for (var j = 0; j < 2; j++) {
        var numeroAleatorio = numeros.charAt(Math.floor(Math.random() * numeros.length));
        placa += numeroAleatorio;
    }

    textPlaca.value = placa;
}

function limparPlaca() {
    textPlaca.value = '';
}

function verificarPlaca() {
    var placa = textPlaca.value.toUpperCase();

    if (placa.length !== 7) {
        return mensagemErro();
    }

    for (var i = 0; i < 3; i++) {
        if (!letras.includes(placa[i])) {
            return mensagemErro();
        }
    }

    if (!numeros.includes(placa[3])) {
        return mensagemErro();
    }

    if (!letras.includes(placa[4])) {
        return mensagemErro();
    }

    if (!numeros.includes(placa[3])) {
        return mensagemErro();
    }

    for (var j = 5; j < 7; j++) {
        if (!numeros.includes(placa[j])) {
            return mensagemErro();
        }
    }

    verificarResultado();
    //teste();
}

function verificarResultado() {
    var placa = textPlaca.value.substring(0, 3).toUpperCase();
    var pegou = false;
    var index = 0;

    for (const estado of Object.values(sul)) {

        if (pegou) break;

        for (const item of Object.values(estado)) {
            var comeco = item.comeco;
            var fim = item.fim;

            if (pegou) break;

            for (let j = letras.indexOf(comeco[0]); j <= letras.indexOf(fim[0]); j++) {
                for (let k = 0; k < letras.length; k++) {
                    for (let t = 0; t < letras.length; t++) {

                        var combinacao = letras[j] + letras[k] + letras[t];

                        if (combinacao === placa &&
                            placa.localeCompare(comeco) >= 0 && placa.localeCompare(fim) <= 0) {
                            resultDiv.style.display = 'block';
                            textResult.innerHTML = resultados[index];
                            pegou = true;
                        }

                        if (combinacao === fim || pegou) {
                            i = letras.length;
                            j = letras.length;
                            k = letras.length;
                        }
                    }
                }
            }

        }

        index++;
    }

    if (!pegou) {
        resultDiv.style.display = 'block';
        textResult.innerHTML = resultados[3];
    }
    console.log(placa);
}

function teste() {
    var placa = textPlaca.value.substring(0, 3).toUpperCase();
    var pegou = false;
    var index = 0;

    for (const estado of Object.values(sul)) {

        if (pegou) break;

        for (const item of Object.values(estado)) {
            var comeco = item.comeco;
            var fim = item.fim;

            if (placa.localeCompare(comeco) >= 0 && placa.localeCompare(fim) <= 0) {
                resultDiv.style.display = 'block';
                textResult.innerHTML = resultados[index];
                pegou = true;
            }
        }
        index++;
    }

    if (!pegou) {
        resultDiv.style.display = 'block';
        textResult.innerHTML = resultados[3];
    }
    console.log(placa);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function mensagemErro() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Formato da placa está inválido.",
    })
}