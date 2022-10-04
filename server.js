const http = require('http')
const port = 9000

http.createServer(( request , response ) => {

    response.writeHead(200, { 'Content-Type': 'application/json' })

    if (request.url === '/produto') {
        response.end(
            JSON.stringify({
                message: "Rota de produto"
        }))
    }

    if (request.url === '/usuario') {
        response.end(
            JSON.stringify({
                message: "Rota de usuários"
        }))
    }

})
.listen(port, () => console.log(`Servidor aberto na porta ${port}`))