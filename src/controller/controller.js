const path = require('path');
const fs = require('fs');
const dbPath = path.resolve(__dirname, '../db/facts.json');

const show = (request, response) => {
    try {
        // Lê de forma síncrona o arquivo json, como string
        const data = fs.readFileSync(dbPath, 'utf8',)
        const facts = JSON.parse(data)
        return response.json(facts)
    } catch (e) {
        // print mensagem de erro no terminal
        console.log(e)
        // retorna mensagem de erro para o usuário com status 500
        return response.status(500).json({ erro: 'Erro de execução!' })
    }
}

const index = (request, response) => {
    // pega o ID requisição
    const { id } = request.params
    try {
        // Lê de forma síncrona o arquivo json, como string
        let data = fs.readFileSync(dbPath, 'utf8')
        // inicializa uma variável nula
        let fact = null
        // transforma a string em json e pega o array facts
        data = JSON.parse(data)['facts']
        // passa por todos os fatos
        for (let index in data) {
            // se encontrar um fato com o mesmo ID que o usuário pediu
            if (data[index]['id'] == id) {
                // a variavel fact recebe o fato com ID
                fact = data[index]
                // para o loop
                break
            }
        }
        // caso a variável não tenha recebido nenhum fato
        if (fact === null) {
            // retorne uma mensagem de erro com o status 400
            return response
                .status(404)
                .json({ erro: 'Nenhum fato foi encontrado!' })
        }
        // retorne o fato encontrado para o usuário
        return response.json(fact)
    } catch (e) {
        // print do erro no terminal
        console.log(e)
        // retorne uma mensagem de erro com o status 500
        return response
            .status(500).json({
                erro: 'Não foi possível executar esta operação!'
            })
    }
}

const create = (request, response) => {
    // lê o campo text do corpo da requisição
    const { text } = request.body
    try {
        // Lê de forma síncrona o arquivo json, como string
        let data = fs.readFileSync(dbPath, 'utf8')
        // transforma a string em json
        data = JSON.parse(data)
        // cria um novo fato
        const newFact = {
            id: String(data['facts'].length + 1),
            text: text,
            type: 'cat',
            upvotes: 0,
        }
        // adiciona o fato ao array de fatos
        data['facts'].push(newFact)
        // sobrescreve o arquivo
        fs.writeFileSync(dbPath, JSON.stringify(data))
        // retorna o fato criado ao usuário com o status 201
        return response.json(newFact)
    } catch (e) {
        // print do erro no terminal
        console.log(e)
        // retorne uma mensagem de erro com o status 500
        return response.status(500).json({
            erro: 'Não foi possível executar esta operação!'
        })
    }
}

const update = (request, response) => {
    // pega o ID da rota
    const { id } = request.params
    // pega o campo text do corpo da requisição
    const { text } = request.body
    try {
        // Lê de forma síncrona o arquivo json como string
        let data = fs.readFileSync(dbPath, 'utf8')
        // inicializa duas variáveis como nulas
        let fact = null
        let indexFact = null
        // transforma a string em json
        data = JSON.parse(data)
        // passa por todos os fatos
        for (let index in data['facts']) {
            // se encontrar um fato com o mesmo ID que o usuário pediu
            if (data['facts'][index]['id'] == id) {
                // variável fact recebe o fato com ID
                fact = data['facts'][index]
                // guarda o index do fato em questão
                indexFact = index
                // para o loop
                break
            }
        }
        // se a variável continua nula
        if (fact === null) {
            // retorne uma mensagem de erro com o status 404
            return response
                .status(404)
                .json({ erro: 'Nenhum fato foi encontrado!' })
        }
        // cria um objeto com o fato existente e altera o campo text
        const updatedFact = {
            ...data['facts'][indexFact],
            text: text,
        }
        // guarda o objeto atualizado ao array de fatos
        data['facts'][indexFact] = updatedFact
        // sobrescreve o arquivo
        fs.writeFileSync(dbPath, JSON.stringify(data))
        // retorna o fato atualizado com o status 200
        return response.status(200).json(updatedFact)
    } catch (e) {
        // print do erro no terminal
        console.log(e)
        // retorne uma mensagem de erro com o status 500
        return response
            .status(500)
            .json({ erro: 'Não foi possível executar esta operação!' })
    }
}

const dlt = (request, response) => {
    // pega o ID da rota
    const { id } = request.params
    try {
        // Lê de forma síncrona o arquivo json como string
        let data = fs.readFileSync(dbPath, 'utf8')
        // inicializa uma variável como
        let indexFact = null
        // transforma a string em json
        data = JSON.parse(data)
        // passa por todos os fatos
        for (let index in data['facts']) {
            // se encontrar um fato com o mesmo ID que o usuário pediu
            if (data['facts'][index]['id'] == id) {
                // guarda o índice do fato em questão
                indexFact = index
                // para o loop
                break
            }
        }
        // se a variável continua nula
        if (indexFact == null) {
            return response
                .status(404).json({ erro: 'Nenhum fato foi encontrado!' })
        }
        // remove um elemento do array a partir do índice
        data['facts'].splice(indexFact, 1)
        // sobrescreve o arquivo
        fs.writeFileSync(dbPath, JSON.stringify(data))
        // retorna o status 204
        return response.sendStatus(204)
        return response()
    } catch (e) {
        // print do erro no terminal
        console.log(e)
        // retorne uma mensagem de erro com o status 500
        return response
            .status(500)
            .json({ erro: 'Não foi possível executar esta operação!' })
    }
}

module.exports = {
    show, 
    index,
    create,
    update,
    dlt
}