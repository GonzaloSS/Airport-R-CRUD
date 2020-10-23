module.exports = app => {
    const airport = require("../controllers/airport.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Airport
    router.post("/", airport.create);
  
    // Retrieve all Airport
    router.get("/", airport.findAll);
  
    // Retrieve a single Airport with id
    router.get("/:id", airport.findOne);
  
    // Update a Airport with id
    router.put("/:id", airport.update);
  
    // Delete a Airport with id
    router.delete("/:id", airport.delete);
  
    // Delete all Airport
    router.delete("/", airport.deleteAll);
  
    app.use('/api/airport', router);
  };