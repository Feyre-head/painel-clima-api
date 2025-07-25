//Server.js
// Importa o framework Express para criar o servidor e rotas HTTP
const express = require("express");

// Importa o Axios, uma biblioteca para fazer requisições HTTP (GET, POST etc.)
const axios = require("axios");

// Carrega variáveis de ambiente do arquivo .env (como a chave da API)
require("dotenv").config();

// Cria uma instância do app Express
const app = express();

// Define a porta em que o servidor irá escutar (ex: http://localhost:3000)
const PORT = 5500;

const cors = require('cors');
app.use(cors());

// ----------------------
// ENDPOINT PRINCIPAL
// ----------------------

// Rota GET em /api/clima — exemplo: /api/clima?cidade=Curitiba
app.get(`/api/clima`, async (req, res) => {
  // Pega o parâmetro de query chamado "cidade" da URL
  const cidade = req.query.cidade;

  // Verifica se a cidade foi enviada; se não, retorna erro 400 (Bad Request)
  if (!cidade) {
    return res.status(400).json({ erro: "Cidade não informada." });
  }

  // Lê a chave da API do arquivo .env
  const apiKey = process.env.OPENWEATHER_API_KEY;
console.log("API KEY:", apiKey); // TEMPORÁRIO: teste apenas

  // Monta a URL para fazer a requisição à API do OpenWeatherMap
  // Inclui: cidade, unidade em Celsius, idioma em pt_br e sua API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&appid=${apiKey}`;

    try{
        //Faz requisição HTTP para a API do OpenWeatherMap
        const response = await axios.get(url)

        //Aramzena os dados retornados da API
        const dados = response.data;

        //Filtra e formata os dados que queremos enviar ao frontend
        const resultado = {
            cidade: dados.name, //Nome da Cidade
            temperatura: dados.main.temp, //temperatura atual
            descricao: dados.weather[0].description, //descrição do clima
            umidade: dados.main.humidity, //umidade do ar (%)
            icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png` //url do icone do clima 
        }

        //Retorna os dados formatados em JSON
        res.json(resultado); 

    }catch(erro) {
      //Caso ocorra erro na requisição, envia erro 500 com mensagem
      console.error(erro.response?.data || erro.message); //Mostra detalhes no terminal 

      res.status(500).json({
        erro: 'Erro ao buscar dados do clima.',
        detalhe: erro.message //Inclui detalhe tecnico para debug
      })

    }
});

// ----------------------
// INICIA O SERVIDOR
// ----------------------
// O app começa a escutar na porta definida
app.listen(PORT,()=>{
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
