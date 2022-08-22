const TodoTask = require('./models/TodoTask')
const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');

dotenv.config()

app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, () => {
    console.log('connected')
    app.listen(3000, () => console.log("server up"));

})

app.set('view engine', 'ejs')



app.get('/', (req, res) => {
    res.render('index.ejs')
    
})



app.get("/chamados", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
    res.render("chamados.ejs", { todoTasks: tasks });
    });
});

app.post('/', async (req, res) => {
    const todoTask = new TodoTask({
        assunto: req.body.assunto,
        texto: req.body.texto,
        nome: req.body.nome
    })

    try { 
        await todoTask.save()
        res.redirect('/')

    } catch (err) {
        res.redirect('/')
    }

})

app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
    res.redirect("/chamados");
    });
});
