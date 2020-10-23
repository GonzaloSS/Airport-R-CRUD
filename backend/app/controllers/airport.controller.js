const db = require("../models");
const Airport = db.airports;
const Op = db.Sequelize.Op;

// Create and Save a new Bicycle
// req --> request (contains the body)
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name  || !req.body.postal || !req.body.initial || !req.body.age) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Airport
  const airport = {
    name: req.body.name,
    postal: req.body.postal,
    initial: req.body.initial,
    age: req.body.age
  };

  // Save Airport in the database
  Airport.create(airport)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Bicycle."
      });
    });
};

// Retrieve all Airport from the database.
exports.findAll = (req, res) => {

  Airport.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Airports."
      });
    });
};

// Find a single Airport with an id
exports.findOne = (req, res) => {
  let id = req.params.id;
  Airport.findByPk(id)
    .then(data => {
      if (!data) {
        res.status(400).send({
          message:
            "No Airport found with that id"
        })
      }
      res.send(data);
      return;
    })
    .catch(err => {
      console.log(err.message);
      console.log("hola");
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Airport with id"
      });
      return;
    });
};

// Update a Airport by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Airport.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Airport was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Airport with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Airport with id=" + id
      });
    });

};

// Delete a Airport with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Airport.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Airport was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Airport with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Airport with id=" + id
      });
    });
};

// Delete all Airport from the database.
exports.deleteAll = (req, res) => {
  Airport.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Airports were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Airports."
      });
    });

};