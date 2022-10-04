const express = require("express");
const { randomUUID } = require("crypto");
const app = express();
const fs = require("fs");
const port = 8000;

app.use(express.json());

// "Banco de dados 🤣"
let products = [];

fs.readFile("products.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    products = JSON.parse(data);
  }
});

//Rota de criação de produto
app.post("/products", (request, response) => {
  const { name, price } = request.body;
  const product = {
    name,
    price,
    id: randomUUID(),
  };
  products.push(product);
  productsFile();

  return response.json(product);
});
// Lista todos os produtos
app.get("/products", (request, response) => {
  return response.json(products);
});
// Procura pelo id 
app.get("/products/:id", (request, response) => {
  const { id } = request.params;
  const product = products.find((product) => product.id === id);
  return response.json(product);
});
// Alterar o produto 
app.put("/products/:id", (request, response) => {
  const { id } = request.params;
  const { name, price } = request.body;

  const productIndex = products.findIndex((product) => product.id === id);
  products[productIndex] = {
    ...products[productIndex],
    name,
    price,
  };
  productsFile();

  return response.json({ message: "Produto alterado com sucesso!" });
});
// Aqui é bem auto-explicativo
app.delete("/products/:id", (request, response) => {
  const { id } = request.params;
  const productIndex = products.findIndex((product) => product.id === id);
  products.splice(productIndex, 1);
  productsFile();

  return response.json({ message: "Produto removido com sucesso!" });
});

function productsFile() {
  fs.writeFile("products.json", JSON.stringify(products), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Produto inserido");
    }
  });
}

app.listen(port, () => console.log(`Servidor iniciado na porta: ${port}`));
