const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()


app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home', { layout: false })

})

app.use(
    express.urlencoded({
        extended: true
        
}) 
)

//app.use(express.json) 



app.post('/prod/insertprod', (req, res) => {
    const nome = req.body.nome
    const id = req.body.quant

    const sql = `INSERT INTO livro (nome, id) VALUES ('${nome}', '${id}')`

    conn.query(sql, function(err){
        if (err){
            console.log(err)
        }

        res.redirect('/')
    })
})

app.get('/prod', (req, res) => {
    const sql = 'SELECT * FROM livro' 

    conn.query(sql, function(err, data){
        if (err){
            console.log(err)
            return
        }

        const listar = data

        console.log (listar)

        res.render('prod', { layout: false, listar })
    })
})

app.get('/prod/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM livro where ${id}` 

    conn.query(sql, function(err, data){
        if (err){
            console.log(err)
            return
        }   
        
        const listarProd = data[0]
        res.render('livro', { layout: false, listarProd})
})
})

const conn = mysql.createConnection({
    host: 'localhost', 
    port: '3307',
    user:'root',
    password: '',
    database: 'livro'

})

conn.connect(function(err) {
    if(err){
        console.log(err)
    }

    console.log('Conectado com sucesso!')

    app.listen(3000)
})

//pagando p editar registro 
app.get('/prod/edit/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM livro where id = ${id}`
    conn.query(sql, function(err, data) {
        if (err){
        console.log(err)
        return
    }

    const prod = data[0]
    res.render('edit', {layout: false, prod } )
    }) 
})
// editando o registro com o post 
app.post('/prod/updateprod', (req, res) => { 

    const id = req.body.id
    const name = req.body.nome
    

    const sql = `UPDATE produto SET nome = '${name}, ${id}`

    conn.query(sql, function(err){
        if(err){
        console.log(err)
        return
    }
})


})







