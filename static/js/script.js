// Variáveis globais para os gráficos
var barChart;
var pieChart;
var isMessagePanelOpen = false;
// Variável global para armazenar os dados do paciente
let patientData = [];

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


function redirectToLista() {
    // Redireciona para a página de login (substitua 'login.html' pelo caminho correto)
    window.location.href = 'lista.html';
}

// Defina uma variável global para armazenar o valor selecionado no <select>
let selectedPatient = '';

// Event listener para o elemento <select> com id 'patientSelect'
document.getElementById('patientSelect').addEventListener('change', function () {
    // Atualize a variável selectedPatient com o valor selecionado
    selectedPatient = this.value;

    // Carregue os dados do paciente selecionado
    loadPatientData(selectedPatient);
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
    // Atualize a variável selectedPatient com o valor selecionado
    selectedPatient = this.value;

    // Carregue os dados do paciente selecionado
    loadPatientData(selectedPatient);
});

// Função para carregar a lista de pacientes do servidor
function loadPatientList() {
    fetch('/api/pacientes') // Substitua pelo caminho correto da rota que fornece a lista de pacientes
        .then(response => response.json())
        .then(data => {
            const patientSelect = document.getElementById('patientSelect');

            // Limpar as opções existentes
            patientSelect.innerHTML = '';

            // Preencher as opções do <select> com os pacientes do banco de dados
            data.forEach(patient => {
                const option = document.createElement('option');
                option.value = patient.id; // Suponha que cada paciente tenha um ID único no banco de dados
                option.textContent = patient.nome; // Substitua 'nome' pelo campo apropriado no seu banco de dados
                patientSelect.appendChild(option);
            });

            // Chame a função para carregar os dados do paciente selecionado
            loadPatientData();
        })
        .catch(error => {
            console.error('Erro ao buscar a lista de pacientes:', error);
        });
}

// Chame a função para carregar a lista de pacientes na inicialização
loadPatientList();

// Chame a função para carregar a lista de pacientes na inicialização
loadPatientList();


function loadPatientData() {
    // Obtém o valor selecionado no <select>
    const selectedPatient = document.getElementById('patientSelect').value;

    // Verifica se um paciente foi selecionado
    if (selectedPatient) {
        // Aqui, você deve fazer uma solicitação para obter os dados do paciente com base no valor selecionado.
        // Isso pode ser feito usando fetch() para acessar uma API no seu backend.

        // Exemplo de solicitação usando fetch:
        fetch(`/api/pacientes/${selectedPatient}`)
            .then(response => response.json())
            .then(patientData => {
                // Preenche a tabela com os dados do paciente
                populatePatientDataTable(patientData);
            })
            .catch(error => {
                console.error('Erro ao carregar dados do paciente:', error);
            });
    } else {
        // Limpa a tabela se nenhum paciente for selecionado
        clearPatientDataTable();
    }
}


// Função para atualizar os gráficos com os dados do paciente selecionado
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

function populatePatientDataTable(patientData) {
    const dataList = document.getElementById('dataList');

    // Limpa qualquer conteúdo anterior na tabela
    dataList.innerHTML = '';

    // Preenche a tabela com os dados do paciente
    // Você precisará iterar sobre os dados e criar <tr> e <td> conforme necessário
    // Por exemplo:
    for (const dataPoint of patientData) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${dataPoint.id}</td>
            <td>${dataPoint.temperatura}</td>
            <td>${dataPoint.umidade}</td>
            <td>${dataPoint.pressao}</td>
            <td>${dataPoint.dataHora}</td>
        `;
        dataList.appendChild(row);
    }

    // Atualiza o nome do paciente no elemento <p>
    document.getElementById('nomePaciente').textContent = patientData[0].nome; // Supondo que o nome esteja na primeira entrada dos dados
}

function clearPatientDataTable() {
    const dataList = document.getElementById('dataList');
    dataList.innerHTML = '';

    // Limpa o nome do paciente
    document.getElementById('nomePaciente').textContent = '';
}


// Chame a função para carregar os dados do paciente inicialmente (caso haja um paciente selecionado)
loadPatientData();
// Chame a função loadPatientData() para carregar os dados do paciente inicialmente
loadPatientData(selectedPatient);

// Função para buscar e preencher os dados da tabela com os dados do banco de dados
function updateDataListFromDatabase() {
    fetch('/api/dados_sensor1') // Substitua pelo caminho correto da rota que fornece os dados do banco de dados
        .then(response => response.json())
        .then(data => {
            const dataList = document.getElementById('dataList');

            // Limpar a tabela existente
            dataList.innerHTML = '';

            // Preencher a tabela com os dados do banco de dados
            data.forEach((row, index) => {
                const rowElement = document.createElement('tr');
                rowElement.innerHTML = `
                    <th scope="row">${index + 1}</th>
                    <td>${row.temperatura} °C</td>
                    <td>${row.umidade} %</td>
                    <td>${row.pressao} hPa</td>
                    <td>${row.postingTime}</td>
                `;
                dataList.appendChild(rowElement);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar dados do banco de dados:', error);
        });
}

function selecionarPaciente() {
    // Limpa a tabela de dados
    document.getElementById('dataList').innerHTML = '';

    // Obtém o elemento de seleção de paciente
    var selectPaciente = document.getElementById('selectPaciente');

    // Obtém o nome do paciente selecionado
    var nomePaciente = selectPaciente.options[selectPaciente.selectedIndex].text;

    // Exibe o nome do paciente selecionado acima da tabela
    document.getElementById('nomePaciente').textContent = nomePaciente;

    // Obtém os dados do banco de dados para o paciente selecionado
    // e preenche a tabela de dados com os dados correspondentes
    // Você precisará implementar essa parte de acordo com a sua lógica e estrutura de dados do banco de dados.
    // Por exemplo, você pode usar AJAX ou fetch API para fazer uma solicitação ao servidor e receber os dados.
    // Após obter os dados, insira-os na tabela de dados usando document.getElementById('dataList').innerHTML = ...;

    // Exemplo de como preencher a tabela de dados com dados estáticos (apague isso e substitua pela sua lógica)
    var dadosPaciente = [
        { temperatura: 36.5, umidade: 60, pressao: 120, dataHora: '2022-10-10 10:00:00' },
        { temperatura: 36.2, umidade: 55, pressao: 118, dataHora: '2022-10-10 11:00:00' },
        { temperatura: 36.8, umidade: 62, pressao: 122, dataHora: '2022-10-10 12:00:00' }
    ];

    for (var i = 0; i < dadosPaciente.length; i++) {
        var dado = dadosPaciente[i];

        var row = document.createElement('tr');
        row.innerHTML = '<th scope="row">' + (i + 1) + '</th>' +
            '<td>' + dado.temperatura + '</td>' +
            '<td>' + dado.umidade + '</td>' +
            '<td>' + dado.pressao + '</td>' +
            '<td>' + dado.dataHora + '</td>';

        document.getElementById('dataList').appendChild(row);
    }
}

// Atualize a lista de dados do banco de dados na inicialização
updateDataListFromDatabase();

// Atualize a lista de dados a cada 5 segundos (ou o intervalo desejado)
setInterval(updateDataListFromDatabase, 5000);

// Atualiza a dashboard a cada 5 segundos (simulação)
setInterval(updateDashboard, 5000);

// Inicializa a dashboard
updateDashboard();
