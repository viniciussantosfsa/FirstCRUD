const express = require("express");
const { randomUUID } = require("crypto");
const app = express();
const port = 8000;

app.use(express.json())

// "Banco de dados"
const products = []

//Rota de criação de produto
app.post("/products", (request, response) => {
    const { name, price } = request.body;
    const product = {
        name,
        price,
        id: randomUUID()
    }

    products.push(product)
    return response.json(product)
})

app.get("/products", (request, response) => {
    return response.json(products)
})
// mostrar id
app.get("/products/:id", (request, response) => {
    const { id } = request.params
    const product = products.find(product => product.id === id)
    return response.json(product)
})

app.put("/products/:id", (request, response) => {
    const { id } = request.params;
    const { name, price } = request.body;

    const productIndex = products.findIndex(product => product.id === id)
    products[productIndex] = { ...products[productIndex], name, price }

    return response.json({ message: "Produto alterado com sucesso!"})
})

app.delete("/products/:id", (request, response) => {
    const { id } = request.params;
    const productIndex = products.findIndex(product => product.id === id);

    products.splice(productIndex , 1);


    return response.json({ message: "Produto removido com sucesso!" });
})

app.listen(port, () => console.log(`Servidor iniciado na porta: ${port}`))