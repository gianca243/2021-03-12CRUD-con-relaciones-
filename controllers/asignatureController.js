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
exports.joining = async (req,res)=>{
  //primero debo saber el nombre de la asignatura y seguido preguntar si existe esa asignatura
  const asignatura = await Asignature.findOne({nombre:req.body.curso})// indagar por un doc cuyo atrivuto nombre sea igual al curso
  // que obtenemos en el body
  // and, or not => y, o ó no
  if(!asignatura){
    // si asignatura obtuvo un error o si no tiene un valor
    return res.status(404).send({message:"no existe el curso"})
  } // !=no ? existe o no existe => !+existe=no existe falso => !+no existe = no no existe
  const user = await User.findOne({userName:req.body.estudiante})// preguntando si hay una coincidencia de un
  //usuario con un documento en la BD 
  if(!user){
    return res.status(404).send({message:"no existe tal usuario"})
  }

  const checkUser = await Asignature.findOne({nombre:req.body.curso, cursantes:user._id})
  if(checkUser){
    return res.status(404).send({message:"usuario ya registrado"})
  }
  asignatura.cursantes.push(user._id)// asignatura es obj, dentro tiene un array, empujo un nuevo dato al array
  //todos los arreglos tienen metodos entre ellos el push, el push empuja un nuevo dato dentro del arreglo
  //vamos a buscar dentro del arreglo = array si existe en usuario que consultamos,
  // buscando coincidencias del array con el _id
  //[1,2,3,4,5] _id:6 => (push) [1,2,3,4,5,6]
  const result = await asignatura.save()
  res.send({message:"usuario registrado"})
}
exports.consult = async (req,res)=>{
  const name = req.params.name
  const user = await User.findOne({userName:name})//obtengo el user a través de un nombre
  if(!user){ //verifico si el user existe
    return res.status(404).send({message:"no existe tal usuario"})
  }
  const checkUser = await Asignature.find({cursantes:user._id}) //consulte los docs que tengan al usuario consultado
  res.send(checkUser)
}

// agregate.send