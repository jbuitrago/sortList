var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var item = require("../controllers/ItemController.js");
var multer  = require('multer');
var fs  = require('fs');
const { parse } = require('querystring');
let data;



// list
router.get('/', function(req, res) {
    item.list(req, res);
    //res.redirect('/items/', { });
});

// get
router.get('/:item', function(req, res) {

    item.show(req, res);
});


// storage
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = './uploads';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {

        callback(null, file.originalname);
    }
});
var upload = multer({storage: storage}).array('files', 12);

//Save Item
router.post('/', function(req, res) {


    var description,image;
    // Upload Image
    upload(req, res, function(err) {
        if (err) {
            console.log(err);
            return res.end('Error');
        } else {
            req.files.forEach(function(file) {


                data={
                    description:req.body.description,
                    image:file.originalname
                };

                try{
                    item.save(data, res);
                    return res;
                }catch(err){

                     return err;
                }


            });

        }
    });

});

// delete Item

router.post('/delete/', function(req, res) {


    try{
        item.delete(req, res)
        console.log(res);
        return res;
    }catch(err){

        return err;
    }

});

// update Item

router.post('/update', function(req, res) {


    var description,image;
    // Upload Image
    upload(req, res, function(err) {
        if (err) {
            console.log(err);
            return res.end('Error');
        } else {
            req.files.forEach(function(file) {


                data={
                    _id: req.body._id,
                    description:req.body.description,
                    image:file.originalname
                };

                try{
                    console.log("ITEM ROUTE:");
                    console.log(data);
                    item.update(data, res);
                    return res;
                }catch(err){

                    return err;
                }


            });

        }
    });


});

module.exports = router;
