module.exports = (app) => {
  const asignature = require("../controllers/asignatureController")
  app.post("/class/create",asignature.create)
}