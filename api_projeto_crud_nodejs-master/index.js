const { request, response } = require("express");
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

// //importa o modulo do redis para dentro do projeto
// const redis = require("redis");
// //cria cliente na Redis
// const redisClient = redis.createClient({
//     url: "redis://default:RqpxSR2m9XjGK32LsF1agyCOJ3cuNWwS@redis-16127.c308.sa-east-1-1.ec2.redns.redis-cloud.com:16127",
//     // professor => url: 'redis://default:FKlJHdPumpEa858L0ACF8GBL41dmAQMv@redis-10302.c308.sa-east-1-1.ec2.redns.redis-cloud.com:10302'
// });
// redisClient.on("error", () => {
//     console.log("Erro ao conectar com o Banco de Dados da Redis");
// });
// //conecta ao banco
// redisClient.connect();

// banco de dados em memória
var clientes = [];

app.get("/listar", (request, response) => {
    response.json(clientes);
    // let lista = redisClient
    //     .get("clientes-mecias")
    //     .then((clientes) => {
    //         response.json(JSON.parse(clientes));
    //     })
    //     .catch(() => {
    //         response.json([]);
    //     });
});

app.post("/cadastrar", (request, response) => {
    let cliente = request.body;
    console.log("Cadastrar:", cliente);
    clientes.push(cliente); //adiciona o cliente no BD
    // redisClient.set("clientes-mecias", JSON.stringify(clientes));
    response.json({ success: true });
});

app.delete("/excluir/:cpf", (request, response) => {
    let cpf = request.params.cpf;
    for (let i = 0; i < clientes.length; i++) {
        let cliente = clientes[i];
        if (cliente.cpf == cpf) {
            //remove o elemento encontrado na posição "i"
            clientes.splice(i, 1);
            console.log("Excluir:", cliente);
        }
    }
    response.json({ success: true });
});

app.put("/alterar", (request, response) => {
    let cliente = request.body;
    //procura o cliente que tem o CPF enviado
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].cpf == cliente.cpf) {
            //substitui os dados do cliente pelos dados enviados pelo front
            clientes[i] = cliente;
            console.log("Alterar:", cliente);
        }
    }
    response.json({ success: true });
});

app.get("/buscar/:nomeBuscado", (request, response) => {
    let nomeBuscado = request.params.nomeBuscado;
    for (let i = 0; i < clientes.length; i++) {
        let cliente = clientes[i];
        if (cliente.nome.toUpperCase() == nomeBuscado.toUpperCase()) {
            console.log("Buscar:", cliente);
            return response.json(cliente);
        }
    }
    response.json(false);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
