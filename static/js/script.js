// Variáveis globais para os gráficos
var barChart;
var pieChart;
var isMessagePanelOpen = false;

document.addEventListener("DOMContentLoaded", function () {
    // Crie o gráfico de barras inicialmente
    createBarChart([0, 0, 0]);

    // Crie o gráfico de pizza inicialmente
    createPieChart([0, 0, 0]);

    // Atualize a dashboard a cada 5 segundos (simulação)
    setInterval(updateDashboard, 5000);

    // Inicialize a dashboard
    updateDashboard();

    // Event listener para o elemento <select> com id 'patientSelect'
    document.getElementById('patientSelect').addEventListener('change', function () {
        // Carregue os dados do paciente selecionado
        loadPatientData();
    });

    // Carregue os dados do paciente inicialmente
    loadPatientData();
});

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
    const temperatura = Math.floor(Math.random() * (30 - 20) + 20); // Temperatura em graus Celsius
    const spo2 = Math.floor(Math.random() * (100 - 90) + 90); // SpO2
    const hPa = Math.floor(Math.random() * (1015 - 1005) + 1005); // Pressão em hPa

    return { temperatura, spo2, hPa };
}

function showAlertMessage(message) {
    const alertMessage = document.getElementById('alertMessage');
    const alertText = document.getElementById('alertText');

    alertText.textContent = message;
    alertMessage.classList.remove('hidden');
    isMessagePanelOpen = true;
}

function hideAlertMessage() {
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.classList.add('hidden');
}

function closeMessagePanel() {
    const messagePanel = document.getElementById('alertMessage');
    messagePanel.classList.add('hidden');

    // Remova o conteúdo da mensagem
    const alertText = document.getElementById('alertText');
    alertText.textContent = '';
}

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

function redirectToLista() {
    // Redireciona para a página de lista (substitua 'lista.html' pelo caminho correto)
    window.location.href = 'lista.html';
}

// Redirecionar para a página de lista ao clicar em "lista"
document.getElementById('list-button').addEventListener('click', function () {
    const message = "Você está prestes a fazer lista. Deseja continuar?";
    if (confirm(message)) {
        // Redireciona para a página de lista (substitua 'lista.html' pelo caminho correto)
        window.location.href = 'lista.html';
    }
});

function redirectToLogin() {
    // Redireciona para a página de login (substitua 'login.html' pelo caminho correto)
    window.location.href = 'login.html';
}

// Redirecionar para a página de login ao clicar em "Login"
document.getElementById('loginButton').addEventListener('click', function () {
    const message = "Você está prestes a fazer login. Deseja continuar?";
    if (confirm(message)) {
        // Redireciona para a página de login (substitua 'login.html' pelo caminho correto)
        window.location.href = 'login.html';
    }
});

// Função para adicionar mensagem ao registro
function addToMessageLog(message) {
    const messageLog = document.getElementById('messageLog');
    const listItem = document.createElement('li'); // Crie um elemento <li> para a lista de mensagens
    listItem.textContent = message; // Defina o texto do elemento <li> como a mensagem recebida
    messageLog.appendChild(listItem); // Adicione o elemento <li> à lista de mensagens
}

function updateDashboard() {
    const { temperatura, spo2, hPa } = generateRandomData();

    // Atualiza a exibição da pressão cardíaca
    document.getElementById('heartRate').textContent = `${temperatura}°C`;
    document.getElementById('spo2').textContent = `${spo2}%`;
    document.getElementById('hPa').textContent = `${hPa} hPa`;

    // Atualize o gráfico de barras
    barChart.data.datasets[0].data = [temperatura, spo2, hPa];
    barChart.update();

    // Atualize o gráfico de pizza
    pieChart.data.datasets[0].data = [temperatura, spo2, hPa];
    pieChart.update();

    // Verifique a temperatura e exiba mensagens de alerta
    if (temperatura >= 25 && temperatura < 28) {
        const message = "A temperatura está dentro da faixa normal.";
        if (!isMessagePanelOpen) {
            showAlertMessage(message);
        }
        addToMessageLog(message);
    } else if (temperatura >= 28) {
        const message = "A temperatura está alta. Considere se refrescar.";
        if (!isMessagePanelOpen) {
            showAlertMessage(message);
        }
        addToMessageLog(message);
    }

    // Verifique a umidade (SpO2) e exiba mensagens de alerta
    if (spo2 >= 90 && spo2 <= 100) {
        const message = "Os níveis de umidade estão dentro da faixa normal.";
        if (!isMessagePanelOpen) {
            showAlertMessage(message);
        }
        addToMessageLog(message);
    } else if (spo2 < 90) {
        const message = "A umidade está baixa. Tente manter-se hidratado.";
        if (!isMessagePanelOpen) {
            showAlertMessage(message);
        }
        addToMessageLog(message);
    }

    // Verifique a pressão (hPa) e exiba mensagens de alerta
    if (hPa >= 1005 && hPa <= 1015) {
        const message = "A pressão está dentro da faixa normal.";
        if (!isMessagePanelOpen) {
            showAlertMessage(message);
        }
        addToMessageLog(message);
    } else if (hPa < 1005) {
        const message = "A pressão está baixa. Consulte um médico, se necessário.";
        if (!isMessagePanelOpen) {
            showAlertMessage(message);
        }
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
    barChart.data.datasets[0].data.push(temperatura);
    barChart.data.datasets[1].data.push(spo2);
    barChart.data.datasets[2].data.push(hPa);

    pieChart.data.datasets[0].data.push(temperatura);
    pieChart.data.datasets[1].data.push(spo2);
    pieChart.data.datasets[2].data.push(hPa);

    barChart.update(); // Atualiza o gráfico de barras
    pieChart.update(); // Atualiza o gráfico de pizza
}

// Continuação do código...
// Limite o número de pontos no gráfico (opcional)
const maxDataPoints = 10; // Por exemplo, limite a 10 pontos
if (barChart.data.labels.length > maxDataPoints) {
    barChart.data.labels.shift();
    barChart.data.datasets[0].data.shift();
}

// Atualiza a variável isMessagePanelOpen com base na abertura/fechamento do painel
const messagePanel = document.getElementById('alertMessage');
isMessagePanelOpen = !messagePanel.classList.contains('hidden');

barChart.update(); // Atualiza o gráfico

// Event listener para o elemento <select> com id 'patientSelect'
document.getElementById('patientSelect').addEventListener('change', function () {
    // Carregue os dados do paciente selecionado
    loadPatientData();
});

// Função para carregar os dados do paciente selecionado
function loadPatientData() {
    const selectedPatient = $('#patientSelect').val();

    // Simule a obtenção de dados do paciente a partir de alguma fonte (por exemplo, um banco de dados)
    let patientData = [];

    // Adicione os dados do paciente selecionado
    if (selectedPatient === 'patient1') {
        patientData = [
            { temperatura: 24.5, spo2: 95, hPa: 1010 },
            { temperatura: 25.0, spo2: 96, hPa: 1011 },
            { temperatura: 25.5, spo2: 97, hPa: 1010 },
        ];
    } else if (selectedPatient === 'patient2') {
        patientData = [
            { temperatura: 26.0, spo2: 94, hPa: 1009 },
            { temperatura: 26.5, spo2: 93, hPa: 1008 },
            { temperatura: 27.0, spo2: 92, hPa: 1007 },
        ];
    }

    // Atualize os dados do paciente na interface do usuário
    updatePatientDataUI(patientData);
}

// Função para atualizar os dados do paciente na interface do usuário
function updatePatientDataUI(data) {
    const patientDataTable = document.getElementById('patientDataTable');
    // Limpe a tabela
    patientDataTable.innerHTML = '';

    if (data.length === 0) {
        // Caso não haja dados, exiba uma mensagem
        const noDataMessage = document.createElement('p');
        noDataMessage.textContent = 'Nenhum dado disponível para este paciente.';
        patientDataTable.appendChild(noDataMessage);
    } else {
        // Caso haja dados, crie uma tabela e adicione os dados do paciente
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        // Crie a linha de cabeçalho
        const headerRow = document.createElement('tr');
        const headerTemperatura = document.createElement('th');
        headerTemperatura.textContent = 'Temperatura (°C)';
        const headerSpO2 = document.createElement('th');
        headerSpO2.textContent = 'SpO2 (%)';
        const headerHPa = document.createElement('th');
        headerHPa.textContent = 'Pressão (hPa)';

        headerRow.appendChild(headerTemperatura);
        headerRow.appendChild(headerSpO2);
        headerRow.appendChild(headerHPa);

        thead.appendChild(headerRow);

        // Adicione os dados do paciente à tabela
        data.forEach((item) => {
            const dataRow = document.createElement('tr');
            const temperaturaCell = document.createElement('td');
            temperaturaCell.textContent = item.temperatura;
            const spo2Cell = document.createElement('td');
            spo2Cell.textContent = item.spo2;
            const hPaCell = document.createElement('td');
            hPaCell.textContent = item.hPa;

            dataRow.appendChild(temperaturaCell);
            dataRow.appendChild(spo2Cell);
            dataRow.appendChild(hPaCell);

            tbody.appendChild(dataRow);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        patientDataTable.appendChild(table);
    }
}

// Atualize a dashboard inicialmente
updateDashboard();
