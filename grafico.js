const ctx = document.getElementById('chartNumeros').getContext('2d');
const chartNumeros = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Empada (g)',
            data: [],
            backgroundColor: 'rgb(173, 216, 230)',
            borderColor: 'rgb(173, 216, 230))',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false,
                min: 36,
                max: 41,
                ticks: {
                    stepSize: 1
                }
            }
        },
    }
});


const ctx2 = document.getElementById('chartTempo').getContext('2d');
const chartTempo = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Empada (s)',
            data: [],
            backgroundColor: 'rgb(173, 216, 230)',
            borderColor: 'rgb(173, 216, 230)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                stepSize: 1
            },
        }
    }
});


