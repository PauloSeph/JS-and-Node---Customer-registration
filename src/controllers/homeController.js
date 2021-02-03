
exports.paginaInicial = (req, res) => {
    res.render('index', {
        titulo: 'Este será o titulo da página <p> Gatin <p>',
        numeros: [0, 1, 2, 3]
    })
}

exports.trataPost = (req, res) => {
    res.send(req.body)
    return;
}

