
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, models) {

    var userModel = models.userModel;
    // var users = [
    //     {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    //     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    //     {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    // ];

   // app.get("/api/user/:username/:password", getUsers);
    app.post("/api/user", createUser);
    app.post("/api/logout", logout);
    app.post("/api/register", register);
    app.get("/api/loggedIn", loggedIn);
    app.post("/api/login", passport.authenticate('local'),login); //local - standard name for local strategy
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    passport.use('local',new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done){    //done - tells whether login was successful or not
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user && bcrypt.compareSync(password, user.password)){
                        done(null, user);    // allows request to go thru (success case)
                    }
                    else{
                        done(null,false);
                    }
                },
                function(err){
                    done(err);
                }
            );
    }


    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res){
        var user = req.user;
        res.json(user);
    }
    function loggedIn(req, res) {
        if(req.isAuthenticated()){
            res.json(req.user);
        }
        else{
            res.send('0');
        }
    }

    function register(req, res){
        var username = req.body.username;
        var password = req.body.password;

        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user){
                        console.log(user);
                        res.json(null);
                       // res.statusCode(400).send("Username already in use");
                       // return;
                    }
                    else{
                        req.body.password = bcrypt.hashSync(user.password);
                        return userModel
                            .createUser(req.body);
                    }
                },
                function(error){
                    res.statusCode(400).send(error);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function (err) {
                            if(err){
                                res.statusCode(400).send(err);
                            }
                            else{
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.statusCode(400).send(err);
                }
            );
    }
    
    function logout(res, req) {
       req.logout();
       res.send(200);
    }
    function deleteUser(req, res) {
        var id = req.params.userId;
        
        userModel
            .deleteUser(id)
            .then(
                function(stats){
                    console.log(stats);
                    res.send(200);
                },
                function(err){
                    res.statusCode(400).send(err);
                }
            );
        
    }

    function updateUser(req, res){
        var id = req.params.userId;
        var newUser = req.body;
        
        userModel
            .updateUser(id, newUser)
            .then(
                function(stats){
                    console.log(stats);
                    res.send(200);
                },
                function(err){
                    res.statusCode(400).send(err);
                }
            );
        // for (var i in users){
        //     if(users[i]._id === id){
        //         users[i].firstName = newUser.firstName;
        //         users[i].lastName = newUser.lastName;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(400);
    }

    function createUser(req, res){
        var user = req.body;
         userModel
             .createUser(user)
             .then(function(user){
                 console.log(user);
                 res.json(user);
             },
             function(error){
                 res.statusCode(400).send(error);
             });
        // users.push(user);
        //
        // res.send(user);
    }

    function findUserById(req, res){
        var id = req.params.userId;
        console.log(req.session.currentUser);

        userModel
            .findUserById(id)
            .then(
                function(user){
                    res.send(user);
                },
                function(error){
                    res.statusCode(400).send(error);
                }
            );
        // for(var i in users){
        //     if(users[i]._id === id){
        //         res.send(users[i]);
        //         return;
        //     }
        // }
        // res.send({});
    }

    function getUsers(req, res){
        var username= req.query['username'];
        var password= req.query['password'];
        console.log(username);
        console.log(password);
        if(username && password){
            findUserByCredentials(username, password, res);

        }
        else if(username){
            findUserByUsername(username, res);
        }
        else {
            res.send(users);
        }
    }

    // function findUserByCredentials(username, password, res){
    //     userModel
    //         .findUserByCredentials(username, password)
    //         .then(
    //             function(user){
    //                 console.log(req.session);
    //                 req.session.currentUser = user;
    //                 res.json(user);
    //             },
    //             function(error){
    //                 res.statusCode(400).send(error);
    //             }
    //         );
    // }

    function findUserByUsername(username, res){

        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.statusCode(400).send(err);
                }

            );
        // for(var i in users){
        //     if(users[i].username === username){
        //         res.send(users[i]);
        //         return;
        //     }
        // }
        // res.send({});
    }

};