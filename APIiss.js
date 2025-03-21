
const map = L.map('map').setView([0, 0], 5); // Inicializa no centro da Terra com zoom 5

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const issIcon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg',
    iconSize: [50, 50]
});

const marker = L.marker([0, 0], { icon: issIcon }).addTo(map);

async function getISSData(){
    const url = 'https://api.wheretheiss.at/v1/satellites/25544';

    try{
        const response = await fetch(url);
        const data = await response.json();

        const { latitude, longitude, velocity } = data;

        // Atualizar posição no mapa
        marker.setLatLng([latitude, longitude]);

        // Atualizar velocidade
        document.getElementById('iss-speed').textContent = velocity.toFixed(2);
        document.getElementById('iss-latitude').textContent = latitude.toFixed(2);
        document.getElementById('iss-longitude').textContent = longitude.toFixed(2);
        
        // Definir o centro do mapa apenas na primeira vez
        if (!map.getCenter().lat && !map.getCenter().lng) {
            map.setView([latitude, longitude], 5);
        }

    } catch (error) {
        console.error("Erro ao obter dados da ISS:", error);
    }

}

// Chamar a função a cada 5 segundos
getISSData();
setInterval(getISSData, 5000);