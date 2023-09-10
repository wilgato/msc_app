// Variáveis globais para os gráficos
var barChart;
var pieChart;

document.addEventListener("DOMContentLoaded", function () {
    // Crie o gráfico de barras inicialmente
    createBarChart([0, 0, 0]);

    // Crie o gráfico de pizza inicialmente
    createPieChart([0, 0, 0]);

    // Atualize a dashboard a cada 5 segundos (simulação)
    setInterval(updateDashboard, 5000);

    // Inicialize a dashboard
    updateDashboard();
});

const sensorDataList = [
    { temperatura: 25.5, spo2: 95, hPa: 1013 },
    { temperatura: 26.0, spo2: 96, hPa: 1014 },
    { temperatura: 25.8, spo2: 94, hPa: 1012 },
];

// Chamada da função para exibir a lista de dados do sensor
showSensorDataList(sensorDataList);

// Função para criar o gráfico de barras
function createBarChart(data) {
    var ctx = document.getElementById('myChart').getContext('2d');
    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Temperatura', 'Umidade', 'Pressão'],
            datasets: [{
                label: 'Valores',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: false, // Impede que o gráfico se ajuste automaticamente
            maintainAspectRatio: false, // Impede que o aspect ratio seja mantido
            // Defina o tamanho desejado para o gráfico aqui
            width: 300,
            height: 100,
            // ...
        }
    });
}

// Função para criar o gráfico de pizza
function createPieChart(data) {
    var ctx = document.getElementById('pieChart').getContext('2d');
    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Temperatura', 'Umidade', 'Pressão'],
            datasets: [{
                label: 'Valores',
                data: data,
                backgroundColor: ['red', 'green', 'blue'],
                borderColor: ['red', 'green', 'blue'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
        }
    });
}

// Simulando dados
function generateRandomData() {
    const heartRate = Math.floor(Math.random() * (100 - 60) + 60); // BPM  Math.floor retorna o menor numero inteiro x
    const spo2 = Math.floor(Math.random() * (100 - 90) + 90); // SpO2
    const hPa = Math.floor(Math.random() * (100 - 95) + 95); // hPa

    return { heartRate, spo2, hPa };
}

document.addEventListener("DOMContentLoaded", function () {
    const message = "Esta é a mensagem de exemplo no popup.";
    showAlertMessage(message);
});

function showAlertMessage(message) {
    const alertMessage = document.getElementById('alertMessage');
    const alertText = document.getElementById('alertText');

    alertText.textContent = message;
    alertMessage.classList.remove('hidden');
}

function hideAlertMessage() {
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.classList.add('hidden');
}

/*
function showHeartRateList() {
    const heartRateList = "Lista de Batimentos:\n\nBatimento 1\nBatimento 2\nBatimento 3";
    showAlertMessage(heartRateList);
}
*/

function showSensorDataList(dataList) {
    let message = "Lista de Dados do Sensor:\n\n";
    dataList.forEach((data, index) => {
        message += `Leitura ${index + 1}:\n`;
        message += `Temperatura: ${data.temperatura}°C\n`;
        message += `Umidade (SpO2): ${data.spo2}%\n`;
        message += `Pressão (hPa): ${data.hPa} hPa\n\n`;
    });
    showAlertMessage(message);
}

function redirectToHome() {
    // Redireciona para a página inicial (substitua 'index.html' pelo caminho correto)
    window.location.href = 'index.html';
}

// Redirecionar para a página de login ao clicar em "Login"
document.getElementById('loginButton').addEventListener('click', function () {
    window.location.href = 'login.html';
});

// Função para adicionar mensagem ao registro
function addToMessageLog(message) {
    const messageLog = document.getElementById('messageLog');
    const listItem = document.createElement('li');
    listItem.textContent = message;
    messageLog.appendChild(listItem);
}

// Função para atualizar a dashboard
function updateDashboard() {
    const { heartRate, spo2, hPa } = generateRandomData();

    // Atualiza a exibição da pressão cardíaca
    document.getElementById('heartRate').textContent = `${heartRate} BPM`;
    document.getElementById('spo2').textContent = `${spo2}%`;
    document.getElementById('hPa').textContent = `${hPa}%`;

    // Atualize o gráfico de barras
    barChart.data.datasets[0].data = [heartRate, spo2, hPa];
    barChart.update();

    // Atualize o gráfico de pizza
    pieChart.data.datasets[0].data = [heartRate, spo2, hPa];
    pieChart.update();


    // Verifica a temperatura cardíaca e exibe mensagens de alerta
    if (heartRate >= 50 && heartRate < 60) {
        const message = "Atenção! Sua temperatura cardíaca está entre 50-60 BPM. Cuide-se antes que passe de 60 BPM.";
        showAlertMessage(message);
        addToMessageLog(message);
    } else if (heartRate >= 60) {
        const message = "Procurar o posto de saúde urgentemente e consultar um médico. Sua pressão cardíaca passou de 60 BPM.";
        showAlertMessage(message);
        addToMessageLog(message);
    }

    // Verifica a saturação de umidade (SpO2) e exibe mensagens de alerta
    if (spo2 >= 75 && spo2 < 80) {
        const message = "Atenção! Seu nível de saturação de umidade está entre 75-80%. A saturação está subindo. Cuide-se.";
        showAlertMessage(message);
        addToMessageLog(message);
    } else if (spo2 >= 80) {
        const message = "Procurar o posto de saúde urgentemente e consultar um médico. Sua saturação de oxigênio está acima de 80%.";
        showAlertMessage(message);
        addToMessageLog(message);
    }

     // Verifica a saturação de pressão (hPa) e exibe mensagens de alerta
     if (hPa >= 95 && hPa < 100) {
        const message = "Atenção! Seu nível de saturação de pressão está entre 75-80%. A saturação está subindo. Cuide-se.";
        showAlertMessage(message);
        addToMessageLog(message);
    } else if (hPa >= 100) {
        const message = "Procurar o posto de saúde urgentemente e consultar um médico. Sua saturação de oxigênio está acima de 80%.";
        showAlertMessage(message);
        addToMessageLog(message);
    }


    
    // Adicione um timestamp às etiquetas (opcional)
    const timestamp = new Date().toLocaleTimeString();

    // Limite o número de pontos no gráfico (opcional)
    const maxDataPoints = 10; // Por exemplo, limite a 10 pontos
    if (barChart.data.labels.length >= maxDataPoints) {
        barChart.data.labels.shift();
        pieChart.data.labels.shift();
    }

    barChart.data.labels.push(timestamp);
    pieChart.data.labels.push(timestamp);

    // Atualize os gráficos de linha
    barChart.data.datasets[0].data.push(heartRate);
    barChart.data.datasets[1].data.push(spo2);
    barChart.data.datasets[2].data.push(hPa);

    pieChart.data.datasets[0].data.push(heartRate);
    pieChart.data.datasets[1].data.push(spo2);
    pieChart.data.datasets[2].data.push(hPa);

    barChart.update(); // Atualiza o gráfico de barras
    pieChart.update(); // Atualiza o gráfico de pizza
    }
 

    // Limite o número de pontos no gráfico (opcional)
    const maxDataPoints = 10; // Por exemplo, limite a 10 pontos
    if (chart.data.labels.length > maxDataPoints) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
    }

    chart.update(); // Atualiza o gráfico



function loadPatientData() {
    const selectedPatient = document.getElementById('patientSelect').value;

    // Simule a obtenção de dados do paciente a partir de alguma fonte (por exemplo, um banco de dados)
    let patientData = [];

    // Adicione os dados do paciente selecionado
    if (selectedPatient === 'patient1') {
        patientData = [
            { temperatura: 25.5, spo2: 95, hPa: 1013 },
            { temperatura: 26.0, spo2: 96, hPa: 1014 },
            { temperatura: 25.8, spo2: 94, hPa: 1012 },
        ];
    } else if (selectedPatient === 'patient2') {
        patientData = [
            { temperatura: 27.0, spo2: 97, hPa: 1012 },
            { temperatura: 26.5, spo2: 98, hPa: 1013 },
            { temperatura: 25.9, spo2: 96, hPa: 1011 },
        ];
    }

    // Chame a função para atualizar os gráficos
    updateCharts(patientData);
}


function updateCharts(patientData) {
    if (patientData.length > 0) {
        const temperatures = patientData.map(data => data.temperatura);
        const spo2Values = patientData.map(data => data.spo2);
        const hPaValues = patientData.map(data => data.hPa);

        // Atualize o gráfico de barras
        barChart.data.datasets[0].data = temperatures;
        barChart.data.datasets[1].data = spo2Values;
        barChart.data.datasets[2].data = hPaValues;
        barChart.update();

        // Atualize o gráfico de pizza
        pieChart.data.datasets[0].data = temperatures;
        pieChart.data.datasets[1].data = spo2Values;
        pieChart.data.datasets[2].data = hPaValues;
        pieChart.update();
    }
}


// Event listener para o elemento <select> com id 'patientSelect'
document.getElementById('patientSelect').addEventListener('change', function () {
    // Carregue os dados do paciente selecionado
    loadPatientData();
});


// Atualiza a dashboard a cada 5 segundos (simulação)
setInterval(updateDashboard, 5000);

// Inicializa a dashboard
updateDashboard();
