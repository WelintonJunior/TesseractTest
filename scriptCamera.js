function initializeTesseract() {
    console.log('Tesseract.js initialized');
}
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const output = document.getElementById('output');
const captureBtn = document.getElementById('capture-btn');

// Acessar a câmera do celular usando WebRTC
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
        video.play();
    })
    .catch(err => {
        console.error('Erro ao acessar a câmera: ', err);
    });

//MOSTRA O MODAL
captureBtn.addEventListener('click', () => {
    document.getElementById('modal').style.display = "flex"
    document.getElementById('bodyModal').style.display = "flex"
    document.getElementById('overlay').style.display = "flex"
})

//INICIA A OPERAÇÂO
document.getElementById('okModal').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('modal').style.display = "none"
    document.getElementById('bodyModal').style.display = "none"
    document.getElementById('overlay').style.display = "none"
    document.getElementById('oprManual').setAttribute('disabled', 'disabled')

    let currentTime = Date.now();
    if (startTime === 0) {
        startTime = currentTime;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Conversão para escala de cinza
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const grey = data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
        data[i] = grey;
        data[i + 1] = grey;
        data[i + 2] = grey;
    }
    ctx.putImageData(imageData, 0, 0);

    // Verifica se o Tesseract.js está inicializado
    if (typeof Tesseract === 'undefined') {
        console.error('Tesseract.js not initialized yet');
        return;
    }

    Tesseract.recognize(
        canvas.toDataURL(), // Passa a imagem como base64
        'eng', // Idioma
        // { logger: m => console.log(m) } // Logger opcional
    ).then(({ data: { text } }) => {
        const regex = /[0-9]+/g;
        const numbers = text.match(regex);
        if (numbers && numbers.length >= 1 && numbers >= 37 && numbers <= 40 && arrayNumbers.length <= 10 && arrayGastoCada.length <= 10) {
            numbers.forEach(number => {
                const finalTimeCada = Date.now();
                arrayNumbers.push(number);
                chartNumeros.data.labels.push(`Empada ${chartNumeros.data.labels.length + 1}`);
                chartNumeros.data.datasets.forEach((dataset) => {
                    dataset.data.push(number);
                });
                chartNumeros.update();
                const timeSinceLastClick = (finalTimeCada - currentTime) / 1000;
                arrayGastoCada.push(timeSinceLastClick);
                chartTempo.data.labels.push(`Empada 1`);
                chartTempo.data.datasets.forEach((dataset) => {
                    dataset.data.push(timeSinceLastClick);
                });
                chartTempo.update();
            });
        } else {
            console.log('Nenhum número encontrado.');
        }
    });

    const interval = setInterval(() => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const grey = data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
            data[i] = grey;
            data[i + 1] = grey;
            data[i + 2] = grey;
        }
        ctx.putImageData(imageData, 0, 0);

        if (typeof Tesseract === 'undefined') {
            console.error('Tesseract.js not initialized yet');
            return;
        }

        Tesseract.recognize(
            canvas.toDataURL(),
            'eng',
            // { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            const regex = /[0-9]+/g;
            const numbers = text.match(regex);

            if (numbers && numbers.length >= 1 && numbers >= 37 && numbers <= 40 && arrayNumbers.length <= 10 && arrayGastoCada.length <= 10) {
                numbers.forEach(number => {
                    const finalTimeCada = Date.now();
                    arrayNumbers.push(number);
                    chartNumeros.data.labels.push(`Empada ${chartNumeros.data.labels.length + 1}`); // Atualiza o eixo X
                    chartNumeros.data.datasets.forEach((dataset) => {
                        dataset.data.push(number); // Adiciona o número ao dataset
                    });
                    chartNumeros.update();
                    const timeSinceLastClick = (finalTimeCada - currentTime) / 1000;
                    currentTime = Date.now();
                    arrayGastoCada.push(timeSinceLastClick);
                    chartTempo.data.labels.push(`Empada ${empada + 1}`);
                    chartTempo.data.datasets.forEach((dataset) => {
                        dataset.data.push(timeSinceLastClick);
                    });
                    chartTempo.update();
                    empada++;
                });
            } else {
                console.log('Nenhum número encontrado.');
            }
        });
    }, 2500);

    const intervalOpr = setInterval(() => {
        if (arrayNumbers.length > 0) {
            document.getElementById('chartNumeros').innerHTML = '';

            if (arrayNumbers.length === 10) {
                setTimeout(() => {
                    const finalClickTime = Date.now();
                    const totalTime = (finalClickTime - startTime) / 1000;
                    document.getElementById('total').innerHTML = `${totalTime.toFixed(2)} segundos`;
                    document.getElementById('capture-btn').setAttribute('disabled', 'disabled');
                    document.getElementById('resetar').removeAttribute('disabled');
                }, 0);
                clearInterval(intervalOpr);
                clearInterval(interval);
            }
        }
    }, 1000);
});
