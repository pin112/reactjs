var express = require('express');
var router = express.Router();
var db = require('../helpers/MongoDbHelper');
var authenticate = require('../helpers/AuthenticateHelper');

var validator = require('validator');

var slack = require('slack');
const token = "xoxp-6826657525-6826354482-152425077456-227498ac7adf408918fd1d6ca614b9ea";


// ---------------------------------------------------------
// authentication (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------
router.post('/authenticate', function (req, res) {
    // check login here   
    authenticate.login(req, res);
});

router.post('/slack-postMessage', function(req, res) {
    // logs {args:{hello:'world'}}
    slack.api.test({hello:'world'}, console.log);
    var result = slack.chat.postMessage(
        {
            token: token, 
            channel: "C4KRH0ELW", 
            text: "This is message fr0m my api"
        }
    );
    res.send(result);
});

router.post('/register', function (req, res) {
    var data = req.body;
    // if (validator.isEmail(data.email) === false) {
    //     res.json({
    //         success: false,
    //         message: "Validate failed: Email",
    //         token: "",
    //         data: null
    //     });
    // }
    db.insertDocument(data, "users", function (result) {
        res.json({
            success: true,
            message: "OK",
            token: "",
            data: result
        });
    })
});

router.get('/contacts', function (req, res) {
    db.findDocuments({}, "contacts", function (result) {
        res.json({
            success: true,
            message: "OK",
            token: "",
            data: result
        });
    })
});

router.post('/contacts', function (req, res) {
    var data = req.body;
    db.insertDocument(data, "contacts", function (result) {
        res.json({
            success: true,
            message: "OK",
            token: "",
            data: result
        });
    })
});

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
router.use(function (req, res, next) {
    authenticate.check(req, res, next);
});

// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------
router.get('/', function (req, res) {
    res.json({
        message: 'Welcome to the coolest API on earth!'
    });
});

router.get('/users', function (req, res) {
    db.findDocuments({}, "users", function (result) {
        res.json({
            success: true,
            message: "OK",
            token: "",
            data: result
        });
    })
});


router.get('/products', function (req, res) {
    db.findDocuments({}, "products", function (result) {
        res.json({
            success: true,
            message: "OK",
            token: "",
            data: result
        });
    })
});

router.get('/product/:id', function (req, res) {
    db.findDocument(req.params.id, "products", function (result) {
        console.log(result);
        res.json({
            success: true,
            message: "OK",
            token: "",
            data: result
        });
    })
});

router.get('/check', function (req, res) {
    res.json(req.decoded);
});



module.exports = router;