// Importe o Chart.js no topo do seu chart.js
import Chart from 'chart.js/auto';

// Crie o gráfico no início do seu chart.js
const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Use isso para as etiquetas do eixo X (por exemplo, timestamps)
        datasets: [{
            label: 'Temperatura',
            data: [], // Use isso para os dados do eixo Y (por exemplo, temperatura)
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
        }, {
            label: 'Umidade',
            data: [], // Use isso para os dados do eixo Y (por exemplo, umidade)
            borderColor: 'rgb(192, 75, 75)',
            fill: false,
        }, {
            label: 'Pressão',
            data: [], // Use isso para os dados do eixo Y (por exemplo, pressão)
            borderColor: 'rgb(75, 75, 192)',
            fill: false,
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Tempo'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Valor'
                }
            }
        }
    }
});

// Faça uma solicitação AJAX para obter os dados do servidor
fetch('/data/chart')
    .then(response => response.json())
    .then(data => {
        // Divida os dados em séries separadas para cada conjunto de dados
        const temperaturaData = data.map(item => item.temperatura);
        const umidadeData = data.map(item => item.umidade);
        const pressaoData = data.map(item => item.pressao);
        const timestamps = data.map(item => item.postingTime); // Suponha que "postingTime" seja uma string de data/hora

        // Atualize os dados do gráfico com os dados obtidos do servidor
        chart.data.labels = timestamps;
        chart.data.datasets[0].data = temperaturaData;
        chart.data.datasets[1].data = umidadeData;
        chart.data.datasets[2].data = pressaoData;
        chart.update(); // Atualize o gráfico
    })
    .catch(error => {
        console.error('Erro ao obter dados do servidor:', error);
    });
