
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, models) {

    var userModel = models.projectUserModel;
    app.post("/api/project/user", createUser);
    app.post("/api/project/logout", logout);
    app.post("/api/project/register", register);
    app.get("/api/project/loggedIn", loggedIn);
    app.post("/api/project/login", passport.authenticate('local'),login); //local - standard name for local strategy
    app.get("/api/project/user/:userId", findUserById);
    app.put("/api/project/user/:userId", updateUser);
    app.delete("/api/project/user/:userId", deleteUser);
    app.get("/api/search/:searchText", searchUsers);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done){    //done - tells whether login was successful or not
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user && (password === user.password)){
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
        console.log(user);
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
    //   req.logout();
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
                 res.statusCode(400).send("Username"+user.username+"is already taken!");
             });

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

    }

    function getUsers(req, res){
        var username= req.query['username'];
        var password= req.query['password'];
        var name = req.query['name'];
        console.log(username);
        console.log(password);
        if(username && password){
            findUserByCredentials(username, password, req,res);

        }
        else if(username){
            findUserByUsername(username, res);
        }
        else if(name){
            searchTeammates(name, res);
        }
        else {
            userModel
                .findAllUsers()
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(error){
                        res.statusCode(400).send(error);
                    }
                );
        }
    }

    function searchTeammates(name, res){
        userModel
            .searchTeammates(name)
            .then(
                function(users){
                    res.json(users);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }


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
    }

    function findUserByCredentials(username, password ,req, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user){
                    console.log(req.session);
                    req.session.createUser=user;
                    res.json(user);
                }, function(error){
                    res.statusCode(400).send(error);
                }
            );
    }

    function searchUsers(req, res){
        var searchText = req.params.searchText;

        userModel
            .searchUsersByUsername(searchText)
            .then(
                function(users){
                    if(users){
                        res.json(users);
                    }
                    else{
                        res.statusCode(400);
                    }
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

};