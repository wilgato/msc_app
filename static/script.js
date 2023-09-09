// Simulando dados
function generateRandomData() {
    const heartRate = Math.floor(Math.random() * (100 - 60) + 60); // BPM
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

function showHeartRateList() {
    const heartRateList = "Lista de Batimentos:\n\nBatimento 1\nBatimento 2\nBatimento 3";
    showAlertMessage(heartRateList);
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

function updateDashboard() {
    const { heartRate, spo2, hPa } = generateRandomData();

    // Atualiza a exibição da pressão cardíaca
    document.getElementById('heartRate').textContent = `${heartRate} BPM`;
    document.getElementById('spo2').textContent = `${spo2}%`;
    document.getElementById('hPa').textContent = `${hPa}%`;

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
    chart.data.labels.push(timestamp);
    
    // Adicione a frequência cardíaca aos dados do gráfico
    chart.data.datasets[0].data.push(heartRate);
    
    // Limite o número de pontos no gráfico (opcional)
    const maxDataPoints = 10; // Por exemplo, limite a 10 pontos
    if (chart.data.labels.length > maxDataPoints) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
    }
    
    chart.update(); // Atualiza o gráfico
    document.getElementById('heartRate').textContent = `${heartRate} BPM`;
    document.getElementById('spo2').textContent = `${spo2}%`;
    document.getElementById('hPa').textContent = `${hPa}%`;
}

// Crie um gráfico de barras
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
        datasets: [{
            label: 'Valores',
            data: [12, 19, 3, 5, 2], // Substitua com seus próprios dados
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

// Gráfico de pizza
var ctxPie = document.getElementById('pieChart').getContext('2d');
var pieChart = new Chart(ctxPie, {
    type: 'pie',
    data: {
        labels: ['Label A', 'Label B', 'Label C'],
        datasets: [{
            label: 'Valores',
            data: [30, 50, 20], // Substitua com seus próprios dados
            backgroundColor: ['red', 'green', 'blue'] // Cores das fatias
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

// Atualiza a dashboard a cada 5 segundos (simulação)
setInterval(updateDashboard, 5000);

// Inicializa a dashboard
updateDashboard();
