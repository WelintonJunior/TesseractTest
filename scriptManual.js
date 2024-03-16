let startTime = 0;
let lastClickTime = 0;
let counterClick = 0;
let arrayGastoCada = [];
let arrayNumbers = [];
let empada = 0;

document.getElementById('resetar').addEventListener('click', (e) => {
    e.preventDefault();
    startTime = 0;
    lastClickTime = 0;
    counterClick = 0;
    arrayGastoCada = [];
    document.getElementById('cadastrarManual').removeAttribute('disabled');
    document.getElementById('resetar').setAttribute('disabled', 'disabled');
    document.getElementById('cada').innerHTML = '';
    document.getElementById('total').innerHTML = '';
    chartNumeros.data.labels = [];
    chartNumeros.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });

    chartNumeros.update();
});

document.getElementById('cadastrarManual').addEventListener("click", (e) => {
    e.preventDefault();
    const currentTime = Date.now();

    if (counterClick === 0) {
        startTime = currentTime;
    } else {
        const timeSinceLastClick = (currentTime - lastClickTime) / 1000;
        arrayGastoCada.push(timeSinceLastClick);
        document.getElementById('cada').innerHTML += `<li>Tempo Empada ${counterClick}: ${timeSinceLastClick.toFixed(2)} segundos</li>`;
    }

    lastClickTime = currentTime;
    counterClick += 1;



    if (counterClick == 11) {
        // Adiciona um pequeno delay para capturar o tempo após o décimo clique
        setTimeout(() => {
            const finalClickTime = Date.now();
            const timeSinceLastClick = (finalClickTime - lastClickTime) / 1000;
            arrayGastoCada.push(timeSinceLastClick);

            const totalTime = (finalClickTime - startTime) / 1000;
            document.getElementById('total').innerHTML = `${totalTime.toFixed(2)} segundos`;
            document.getElementById('cadastrarManual').setAttribute('disabled', 'disabled');
            document.getElementById('resetar').removeAttribute('disabled');
            counterClick = 0;
        }, 0); // O delay é 0 para apenas colocar a execução deste bloco no fim da fila de execução do JavaScript
    } else {
        let valorInput = document.getElementById('outInput').value;
        arrayNumbers.push(valorInput);
            chartNumeros.data.labels.push(`Empada ${chartNumeros.data.labels.length + 1}`);
            chartNumeros.data.datasets.forEach((dataset) => {
                dataset.data.push(valorInput);
            });
        chartNumeros.update();
    }

});
