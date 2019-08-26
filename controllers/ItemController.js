
const Item = require('../models/Item');


var itemController = {};

// Show list of items
itemController.list = function(req, res) {


  Item.find()
      .then(items => res.render('../views/items/index', { items }))
      .catch(err => res.status(404).json({ msg: 'No items found' }));


};


// Show item by id
itemController.show = function(req, res) {

  Item.findOne({_id: req.params.item}).exec(function (err, item) {
    if (err) {

      res.send(err);
    }
    else {
      res.send({item});
    }
  });
};

// Save new item
itemController.save = function(req, res) {


  var item = new Item({
    "description": req.description,
    "image": req.image
  });


  item.save(function(err,newItem) {
    if(err) {
      res.send(err);
      return false;
    } else {
      res.status(200).send(newItem);
    }
  });
};



// Update new item
itemController.update = function(req, res) {


  var item = new Item({

    "description": req.description,
    "image": req.image
  });

  item.updateOne({_id: req._id},function(err,newItem) {
    if(err) {
      res.send(err);
      return false;
    } else {
      res.status(200).send(newItem);
    }
  });
};


// Delete  item
itemController.delete = function(req, res) {


  Item.remove({_id: req.body.item}, function(err) {
    if(err) {
      res.send(err);

    } else {
      res.status(200);
    }
  });


};


module.exports = itemController;
