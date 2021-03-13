const mongoose = require("mongoose")

const asignatureSchema = new mongoose.Schema({
  code:{ type:Number, required:true, unique:true },
  nombre:{ type:String, required:true, unique:true },
  jornada:{ type:String, required:true },
  cursantes: Array
})

module.exports = mongoose.model('Asignature',asignatureSchema)