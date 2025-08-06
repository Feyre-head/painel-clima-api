   app.use(cors({
            origin: 'http://127.0.0.1:3000'
        }));

        function searchWeather() {
            const city = document.getElementById('cityInput').value;

            if (!city) {
                alert('City not Found');
                return;
            }

            const url = `http://localhost:3000/api/clima?cidade=${encodeURIComponent(city)}`;

            fetch(url)
                .then(res => res.json())
                .then(dados => {
                    if (dados.erro) {
                        document.getElementById('weatherResult').innerHTML = `<p><strong>Erro:</strong> ${dados.erro}</p>`;
                        return;
                    }


                    document.getElementById('weatherResult').style.display = 'block'; // exibe se estava escondido

                    document.getElementById('weatherResult').innerHTML = `
                        <h2>${dados.cidade}</h2>
                        <p><strong>Temperatura:</strong> ${dados.temperatura}°C</p>
                        <p><strong>Condição:</strong> ${dados.descricao}</p>
                        <p><strong>Umidade:</strong> ${dados.umidade}%</p>
                        <img src="${dados.icone}" alt="Ícone do clima" class="floating weather-icon " />
                `
                })
                .catch(erro => {
                    console.error('Error Req', erro);
                    document.getElementById('weatherResult').innerHTML = `<p>Error fetching data.</p> `
                })
        }