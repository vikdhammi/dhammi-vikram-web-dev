
module.exports = function(){

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("ProjectUser", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findGoogleUser: findGoogleUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser,
        searchUsersByUsername: searchUsersByUsername
    };
    
    return api;

    function findGoogleUser(id) {
        return User.findOne({"google.id": id});
    }
    
    function findUserByUsername(username){
        return User.findOne({username: username});
    }

    function findUserByCredentials(username, password){
        return User.findOne({username: username, password: password});
    }

    function createUser(user){
        console.log("user.model.server.createUser()");
        console.log(user);
        return User.create(user); // inserts data in db
    }

    
     function findUserById(userId) {
        return User.findById(userId);
     }
    
    function updateUser(userId, newUser) {
        delete newUser._id;    //if you want to set the entire object to newUser
        return User.update({_id: userId},{
            $set: newUser
           // Alt. way -   $set: user
        });
     }

    function deleteUser(userId) {
        return User.remove({_id: userId});
     }

    function searchUsersByUsername(searchText){
        return User.find({'$or':[
            {'username':{'$regex':searchText, '$options':'i'}},
            {'firstName':{'$regex':searchText, '$options':'i'}},
            {'lastName':{'$regex':searchText, '$options':'i'}}]}).sort('-dateCreated');
    }
};