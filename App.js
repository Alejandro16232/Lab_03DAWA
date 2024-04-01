const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/autenticar', (req, res) => {
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;

    if (usuario === 'usuario' && contrasena === 'contrasena') {
        res.redirect('/matriculas');
    } else {
        res.render('login', { error: 'Usuario o contraseña incorrectos' });
    }
});

app.get('/matriculas', (req, res) => {
    const cursos = ['Java', 'PHP', '.NET'];
    res.render('matriculas', { cursos });
});

app.post('/modulos', (req, res) => {
    const curso = req.body.curso;
    let precio = 0;
    switch (curso) {
        case 'Java':
            precio = 1200;
            break;
        case 'PHP':
            precio = 800;
            break;
        case '.NET':
            precio = 1500;
            break;
    }
    res.render('modulos', { curso, precio });
});

app.post('/medioPago', (req, res) => {
    const curso = req.body.curso;
    const modulos = req.body.modulos;
    const precio = req.body.precio;
    res.render('mediopago', { curso, modulos, precio });
});


app.post('/confirmacion', (req, res) => {
    const curso = req.body.curso;
    const modulos = req.body.modulos.split(',');
    const medioPago = req.body.medioPago;
    let precio = req.body.precio;
    if (medioPago === 'Pago en efectivo') {
        precio *= 0.9; 
    }
    res.render('confirmacion', { curso, modulos, medioPago, precio });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
