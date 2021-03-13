const Asignature = require("../models/asignature")
const User = require("../models/user")

exports.create = async (req, res)=>{ // informo de que la funcion es asincrona
  const asignatura = new Asignature({ //a la const es de tipo Asignature
    code:req.body.code,
    nombre:req.body.nombre,
    jornada:req.body.jornada
  })
  const result = await asignatura.save() // el await va permitir que la promesa que tiene al frente se termine de ejecutar 
  if(!result){
    return res.status(404).send({message:"hubo un campo incompleto"})
  }
  // break
  res.send(result)
}