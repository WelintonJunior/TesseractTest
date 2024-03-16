let startTime = 0;
let lastClickTime = 0;
let counterClick = 0;
let arrayGastoCada = [];
let arrayNumbers = [];
let empada = 0;

let auxStartManual = 0;

const ENTRADA_MASSA = prompt('Insira o peso total da massa (g):');

let amais = 0;
let desperdicio = 0;

document.getElementById('oprManual').addEventListener('click', (e) => {
    e.preventDefault();
    auxStartManual = 1;
    startTime = Date.now();
    document.getElementById('cadastrarManual').removeAttribute('disabled');
    e.target.setAttribute('disabled', 'disabled');
});

document.getElementById('cadastrarManual').addEventListener("click", (e) => {
    e.preventDefault();
    if (auxStartManual === 1)
        CadastrarManual();

})

document.getElementById('outInput').addEventListener('keyup', (event) => {
    if (auxStartManual === 1)
        if (event.key === 'Enter') {
            CadastrarManual();
        }
})

function CadastrarManual() {

    const currentTime = Date.now();

    if (counterClick === 0) {
        const timeSinceLastClick = (currentTime - startTime) / 1000;
        arrayGastoCada.push(timeSinceLastClick);
        chartTempo.data.labels.push(`Empada ${counterClick + 1}`);
        chartTempo.data.datasets.forEach((dataset) => {
            dataset.data.push(timeSinceLastClick);
        });
        chartTempo.update();
    } else {
        if (counterClick !== 10) {
            const timeSinceLastClick = (currentTime - lastClickTime) / 1000;
            arrayGastoCada.push(timeSinceLastClick);
            chartTempo.data.labels.push(`Empada ${counterClick + 1}`);
            chartTempo.data.datasets.forEach((dataset) => {
                dataset.data.push(timeSinceLastClick);
            });
            chartTempo.update();
        }
    }

    lastClickTime = currentTime;
    counterClick++;

    if (counterClick === 10) {
        const finalClickTime = Date.now();
        const timeSinceLastClick = (finalClickTime - lastClickTime) / 1000;
        arrayGastoCada.push(timeSinceLastClick);

        chartTempo.data.labels.push(`Empada ${counterClick}`);
        chartTempo.data.datasets.forEach((dataset) => {
            dataset.data.push(timeSinceLastClick);

            let pesoMassaTotal = 0;
            for (i = 0; i < arrayNumbers.length; i++) {
                pesoMassaTotal += parseInt(arrayNumbers[i])
            }

            desperdicio = parseInt(ENTRADA_MASSA - pesoMassaTotal)
            document.getElementById('desperdicio').innerHTML = `${desperdicio} g`
        });
        chartTempo.update();

        const totalTime = (finalClickTime - startTime) / 1000;
        document.getElementById('total').innerHTML = `${totalTime.toFixed(2)} segundos`;
        document.getElementById('cadastrarManual').setAttribute('disabled', 'disabled');
        document.getElementById('oprManual').setAttribute('disabled', 'disabled');
        document.getElementById('resetar').removeAttribute('disabled');
        counterClick = 0;
        auxStartManual = 0
    } else {
        let valorInput = document.getElementById('outInput').value;
        amais += parseInt(valorInput - 37)
        document.getElementById('amais').innerHTML = `${amais} g`
        arrayNumbers.push(valorInput);
        chartNumeros.data.labels.push(`Empada ${counterClick}`);
        chartNumeros.data.datasets.forEach((dataset) => {
            dataset.data.push(valorInput);
        });
        chartNumeros.update();
    }
}


document.getElementById('resetar').addEventListener('click', (e) => {
    e.preventDefault();
    startTime = 0;
    lastClickTime = 0;
    counterClick = 0;
    arrayGastoCada = [];
    document.getElementById('outInput').value = ""
    document.getElementById('cadastrarManual').removeAttribute('disabled');
    document.getElementById('oprManual').removeAttribute('disabled');
    document.getElementById('resetar').setAttribute('disabled', 'disabled');
    document.getElementById('total').innerHTML = '';
    chartNumeros.data.labels = [];
    chartNumeros.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });
    chartTempo.data.labels = [];
    chartTempo.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });

    chartNumeros.update();
    chartTempo.update();
});
