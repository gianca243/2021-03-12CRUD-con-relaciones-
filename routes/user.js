module.exports = (app) => { /* Parametro app. guarda las funcionalidades de express del index.js */
    // const user = require('../controllermodule.exports = (app) => { /* Parametro app. guarda las funcionalidades de express del index.js */
    const user = require('../controllers/userController') /* Requerimos el controlador */

    app.post('/user/create', user.create) /* en la app vamos a usar post, creamos una ruta cualquiera que nos indique que ahi vamos a crear un usuario */
    app.get('/user/get',user.findAll)
    app.get('/user/getOne/:id',user.findOne) // el :id definio un pathParameter (parametro de ruta)
    app.put('/user/update/:id',user.update)
    app.delete('/user/delete/:id',user.delete)
}