const TodoTask = require('./models/TodoTask')
const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');

dotenv.config()

app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs')
    
})

app.get("/chamados", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
    res.render("chamados.ejs", { todoTasks: tasks });
        
        console.log(err);
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

mongoose.connect("mongodb+srv://polartica:Pdb157889@cluster0.rwunath.mongodb.net/?retryWrites=true&w=majority&ssl=true", {useNewUrlParser: true}, () => {
    console.log('connected')
    
    app.listen(process.env.PORT, () => console.log("server up"));

})
