var express = require("express");
var router = express.Router();
var User= require("../models/user");
var passport= require("passport");

router.get("/", function(req, res){
    res.render("landing");
});

//===================================
//AUTH ROUTES
//===================================

//SHOW REGISTER FORM
router.get("/register", function(req, res){
    res.render("register");
});

//HANDLE SIGN UP LOGIC
router.post("/register", function(req, res){
var newUser = new User({username: req.body.username});
//SAVES USERNAME AND HASH FOR PASSWORD
User.register(newUser, req.body.password, function(err, user){
if(err){
    req.flash("error", err.message);
    res.redirect("register");
}   
//IF AUTHENTICATED, SENT BACK TO INDEX
passport.authenticate("local")(req, res, function(){
req.flash("success", "Welcome to YelpCamp " + user.username)    
res.redirect("/campgrounds");    
        });
    });
});

//show login form 
router.get("/login", function(req, res){
    res.render("login");
});

//handling login logic
//app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect:  "/login"
    }), function(req, res){
});

//logout route logic
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!")
    res.redirect("/campgrounds");
});

module.exports = router;
