const User = require('../models/user') /* Requerimos el modelo de nuestro documento */


exports.create = (req, res) => { /* Creamos la promesa, una promesa es un objeto devuelto al cuál se adjuntan funciones callback, en lugar de pasar callbacks a una función. */
    const nUser = new User({
        code: req.body.code,
        userName: req.body.userName,
        email: req.body.email,
        position: req.body.position
    })

    nUser.save().then( /* Le pasamos el metodo save, El método then() retorna una Promesa. Recibe dos argumentos: funciones callback  para los casos de éxito y fallo de Promise. */
        data => { /* Parametro, del proceso exitoso. Almacena el proceso exitos. En este caso la informacion de la peticion */
            res.send(data) /* Me regrese como respuesta el parametro exitoso */
        }
    ).catch( /*El método catch() retorna una Promise y solo se ejecuta en los casos en los que la promesa se marca como rechazada  */
        error => {
            res.status(500).send({
                message: error.message || 'Error to create the user'
            })
        }
    )
    console.log(nUser);

}
exports.findAll = (req,res)=>{ // una funcion para encontrar todos los documentos 
  User.find({}) //tomamos el modelo de user, utilizamos el metodo find
                //el metodo find recibe unos parametros que condicionan la busqueda
                //Cuando el objeto que recibe esta vacio 
    .then((data)=>{ 
      res.send(data) //en caso de exito envio la informacion
    })
    .catch((err)=>{
      res.status(500).send({ message: "hubo un error en el servidor" })
    })
}
exports.findOne = (req,res)=>{
  const id =  req.params.id // pendiente
  User.findById(id)
    .then((data)=>{
      if(!data){
        res.status(404).send({message:"no se encontro el usuario con el id "+id})
      } else {
        res.send(data)
      }
    })
    .catch((err)=>{
      // console.log('err',err);
      res.status(500).send({message:"error en el servidor"})
    })
}
exports.update = (req,res)=>{
  const id = req.params.id
  if(!req.body){
    return res.status(400).send({message:"El cuerpo de la peticion no puede ir vacio"})
  }
  User.findByIdAndUpdate(id,req.body,{ useFindAndModify:false })
    .then((data)=>{
      if(!data){
        res.status(404).send({message:"No se puede editar un usuario inexistente"})
      } else {
        res.send({message:"El usuario se ha actualizado"})
      }
    })
    .catch((err)=>{
      res.status(500).send({message:"Hubo un problema en el servidor"})
    })
}
exports.delete = (req,res)=>{
  const id = req.params.id

  User.findByIdAndRemove(id)
    .then((data)=>{
      if(!data){
        res.status(404).send({message:"no se puede eliminar el documento porque no se encontró"})
      } else {
        res.send({message:"se elimino el documento exitosamente"})
      }
    })
    .catch((err)=>{
      res.status(500).send({message:"hubo un error en servidor"})
    })
} 



