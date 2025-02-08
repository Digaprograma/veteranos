require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(express.json());

// Configurações do GitHub
const GITHUB_USER = process.env.GITHUB_USER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const FILE_PATH = "data.json"; // Nome do arquivo no repositório

// Rota para salvar os dados no GitHub
app.post("/save", async (req, res) => {
    try {
        const data = req.body; // Dados enviados pelo site

        // Busca o arquivo atual do GitHub
        const fileResponse = await axios.get(`https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${FILE_PATH}`, {
            headers: { Authorization: `token ${GITHUB_TOKEN}` },
        });

        const sha = fileResponse.data.sha; // SHA do arquivo atual

        // Atualiza o arquivo no GitHub
        const response = await axios.put(`https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${FILE_PATH}`, {
            message: "Atualizando dados do site",
            content: Buffer.from(JSON.stringify(data, null, 2)).toString("base64"),
            sha: sha,
        }, {
            headers: { Authorization: `token ${GITHUB_TOKEN}` },
        });

        res.json({ message: "Dados salvos no GitHub!", url: response.data.content.html_url });
    } catch (error) {
        console.error("Erro ao salvar no GitHub:", error.response?.data || error.message);
        res.status(500).json({ error: "Erro ao salvar os dados." });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
