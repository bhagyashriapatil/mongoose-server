const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./contact/user-schema');
const StateModel = require('./contact/state-schema');
const DistModel = require('./contact/district-schema');
const TalukaModel = require('./contact/taluka-schema');
const ContactModel = require('./contact/contact-schema');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json())
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/signUp',function(req,res){
 var User = new UserModel(req.body);
 // make this available to our users in our Node applications
 User.save(function (err) {
    if (err) {
        res.status(500).json({
            "err": "Email Id already exists."
        });
    }
    else {
        UserModel.find({ email: req.body.email }, function (err, data) {
            res.status(200).json({
                "message": "Email ID saved successfully!"
            });
        });
    }
  });
});


 app.post('/login', function(req,res){
     
    UserModel.find({ email: req.body.email, password: req.body.password }, function (err, data) {
        if (err) {
            res.status(500).json({
               "err": err
            });
        }
        else if(data.length===0){
            res.status(500).json({
                "err": "Unauthorized user"
            })
        } else if(data.length) {
            let authData = {
                "message": "Login Successfullly,Authorized User!",
                "data": data
            }
            res.status(200).json({
                "success": authData
            });
        }
    });
 });


app.post('/stateData', function(req, res){
    console.log("0asdasaasas");
    var statedata = new StateModel(req.body);
    StateModel.find({ state: req.body.state }, function (err, data) {
         if (err) {
             console.log("1");
            res.status(500).json({
                "err": err
            });
        } else if(data.length===0) {
            console.log("2");
            statedata.save(function (err) {
                if(err){
                    res.status(500).json({
                        "err": err
                    });
                }
                res.status(200).json({
                    "message": "State saved successfully!",
                });
            })
        } else {
            console.log("3");
            res.status(500).json({
                "err": "State already exists!"
            })
        }
    });
});

app.post('/districtData', function(req, res){
    var distModel = new DistModel(req.body);
    DistModel.find({ state: req.body.state, district: req.body.district }, function(err, data){
        if (err) {
            res.status(500).json({
                "err": err
            });
        } else if(data.length===0) {
            distModel.save(function(err){
                if (err) {
                    res.status(500).json({
                        "err": err
                    });
                } else {
                    res.status(200).json({
                        "message": "Distrct added succesfully!"
                    })
                }
            })
        } else {
            res.status(500).json({
                "err": "Distrct already exists!"
            });
        }
    })
});

app.post('/talukaData', function(req, res){
 var talukaModel = new TalukaModel(req.body);
 TalukaModel.find({ taluka: req.body.taluka},function(err, data){
    if (err) {
        res.status(500).json({
            "err": err
        });
    } else if(data.length===0){
        talukaModel.save(function(err){
            if (err) {
                res.status(500).json({
                    "err": err
                });
            } else {
                res.status(200).json({
                    "message": "Taluka added successfully!"
                })
            }  
        })
    } else {
        res.status(500).json({
            "err": "Taluka already exists!"
        })
    }
  })
});

// id and emailid will always different 
app.post('/saveData', function(req, res){
 var contmodel = new ContactModel(req.body);
 ContactModel.find({ email: req.body.email, id: req.body.id }, function(err, data){
     if(err) {
         res.status(500).json({
             "err": err
         })
     } else if(data.length===0) {
         contmodel.save(function(err){
             if(err) {
                res.status(500).json({
                    "err": "Unmatched Data!"
                })  
             } else {
                res.status(200).json({
                    "message": "Contact saved successfully!"
                })
             }
         })
     } else {
        res.status(500).json({
            "err": "Contact already exists!"
        })
     }
 })
});

//api for: fetch all contacts
app.get('/contactlist', function(req, res){
    ContactModel.find({}, function(err, data){
        if(err) {
            res.status(500).json({
                "err": err
            })
        } else {
            res.status(200).json(data);
        }
    })
});


//api for: fetch contact by emailid or username
app.get('/contListByEmail', function(req, res){
    ContactModel.findOne({ email: 'admin1@gmail.com'}, function(err, data){
        if(err) {
            res.status(500).json({
                "err": err
            })
        } else if(data===null) {
            res.status(500).json({
                "err": "Email ID doesn't exist in contact."
            })
        } else {
            res.status(200).json(data);
        }
    })
});


// api for: update email
app.post('/emailUpdate', function(req, res){
  var newEmail = new ContactModel(req.body);
  ContactModel.findOneAndUpdate( { userName: req.body.userName },{ email: 'rajshree.talent@gmail.com'}, function(err, data){
    if(err) {
        res.status(500).json({
            "err": err
        })
    } else if(data.length===0) {
        res.status(500).json({
            "err": "Username doesn't match!"
        })
    } else {
        res.status(200).json({
            "message": "Email ID updated!"
        });
    }
  })
});

// delete one matched taluka
app.delete('/talukaDelete', function(req, res){
    // console.log("req.body", req.body);
    TalukaModel.findOneAndRemove( {taluka: req.body.taluka}, function(err, data) {
        // console.log("err", err);
        // console.log("data", data);
        if(err) {
            res.status(500).json({
                "err": err
            })  
        } else if(data===null) {
            res.status(200).json({
                "message": "Taluka not exists to delete!"
            }); 
        } else {
            res.status(200).json({
                "message": "taluka deleted successfully!"
            })
        }
    })
})

// deleted multiple talukas (but its not working)
// app.delete('/talukaDelete', function(req, res) {
//     console.log("req.body", req.body);
//     TalukaModel.find( {taluka: req.body.taluka}, function(err, data){
//         console.log("data", data);
//         console.log("err", err);
//         if(err) {
//             res.status(500).json({
//                 "err": err
//             }) 
//         } else if(data.length===0){
//             res.status(200).json({
//                 "message": "Taluka not exists to delete!"
//             });
//         } else {
//             data.remove(function(err){
//               if(err) {
//                 res.status(500).json({
//                     "err": err
//                 }) 
//               } else {
//                 res.status(200).json({
//                     "message": "Taluka deleted!"
//                 });  
//               }
//             })
//         }
//     })
// })

app.get('/users/:userId/books/:bookId', function(req, res){
    res.send(req.params);
});

// var cb0 = function (req, res, next) {
//     console.log('CB0')
//     next()
//   }
  
//   var cb1 = function (req, res, next) {
//     console.log('CB1')
//     next()
//   }
  
//   var cb2 = function (req, res) {
//     res.send('Hello from C!');
    
//   }
  
//   app.get('/example/c', [cb0, cb1, cb2]);

app.route('/book')
.get(function (req, res) {
  res.send('Get a random book')
})
.post(function (req, res) {
  res.send('Add a book')
})
.put(function (req, res) {
  res.send('Update the book')
})



app.listen(3003, function() {
    console.log('Example app listening on port 3003!');
});





