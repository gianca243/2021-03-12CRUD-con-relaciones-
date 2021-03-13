module.exports = (app) => {
  const asignature = require("../controllers/asignatureController")
  app.post("/class/create",asignature.create)
  app.put("/class/join",asignature.joining)
  app.get("/class/userClasses/:name",asignature.consult)
}