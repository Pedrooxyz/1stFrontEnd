async function carregarDadosCSV() {
    const resposta = await fetch("ZonAnn.Ts+dSST.csv");
    const texto = await resposta.text();

    const linhas = texto.split("\n").slice(1); 

    let anos = [];
    let temperaturas = [];

    for (let linha of linhas) {
        let colunas = linha.split(",");

        if (colunas.length < 2 || isNaN(colunas[0]) || isNaN(colunas[1])) continue;

        let ano = parseInt(colunas[0].trim());
        let temperaturaAjustada = parseFloat(colunas[1].trim()) + 14; 

        anos.push(ano); 
        temperaturas.push(temperaturaAjustada); 
    }

    getGraph(anos, temperaturas);
}

function getGraph(anos, temperaturas) {
    const ctx = document.getElementById('graficoTemperaturas').getContext('2d');

    // Criar o gráfico com Chart.js
    new Chart(ctx, {
        type: 'line', // Tipo do gráfico: linha
        data: {
            labels: anos, // Eixo X: anos
            datasets: [{
                label: 'Temperatura Global Média (°C)', // Legenda do gráfico
                data: temperaturas, // Eixo Y: temperaturas ajustadas
                borderColor: 'red', // Cor da linha
                backgroundColor: 'rgba(255, 0, 0, 0.2)', // Preenchimento abaixo da linha
                borderWidth: 2,
                pointRadius: 3, // Tamanho dos pontos na linha
                pointBackgroundColor: 'red', // Cor dos pontos
                fill: true, // Preencher a área abaixo da linha
                tension: 0.4 // Suavizar a curva
            }]
        },
        options: {
            responsive: true, // O gráfico se ajusta automaticamente ao tamanho da tela
            scales: {
                y: {
                    beginAtZero: false, // Começa do zero no eixo Y (mas permite valores negativos)
                    title: {
                        display: true,
                        text: 'Temperatura (°C)' // Título do eixo Y
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Ano' // Título do eixo X
                    }
                }
            }
        }
    });
}

carregarDadosCSV();