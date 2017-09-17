var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var User = require('../models/users');


passport.serializeUser(function(user,done){
	done(null,user.id);
});

passport.deserializeUser(function(id,done){
	User.findById(id,function(err,user){  
		done(err,user);
	});
});

//Create New User
passport.use('local.signup',new LocalStrategy(
	{usernameField:'email',
	 passwordField:'password',
	 passReqToCallback:true
	},function(req,email,password,done){
		req.checkBody('email','Invalid email address').notEmpty().isEmail();
		req.checkBody('password','Invalid password,should contain atleast 4 characters').notEmpty().isLength({min:4});
		var errors = req.validationErrors();
		if(errors)
		{
			var messages=[];
			errors.forEach(function(error){
				messages.push(error.msg);
			})
			return done(null,false,req.flash('error',messages));
		}	
		User.findOne({'email':email},function(err,user){
			if(err)
			{
				return done(err);
			}
			if(user)
			{
				return done(null,false,{message:"Email already in use"});
			}
			var newUser = new User();
			newUser.email = email;
			newUser.password = newUser.encryptPassword(password);
			newUser.save(function(err,result){
				if(err){
					return done(err);
				}
				return done(null,newUser);
			})	
		})
}))

//Create New User
passport.use('local.signin',new LocalStrategy(
	{usernameField:'email',
	 passwordField:'password',
	 passReqToCallback:true
	},function(req,email,password,done){
		req.checkBody('email','Invalid email address').notEmpty().isEmail();
		req.checkBody('password','Invalid password,should contain atleast 4 characters').notEmpty();
		var errors = req.validationErrors();
		if(errors)
		{
			var messages=[];
			errors.forEach(function(error){
				messages.push(error.msg);
			})
			return done(null,false,req.flash('error',messages));
		}	
		User.findOne({'email':email},function(err,user){
			if(err)
			{
				return done(err);
			}
			if(!user)
			{
				return done(null,false,{message:"User doesn't exist"});
			}
			if(!user.validPassword(password))
			{
				return done(null,false,{message:"Wrong password"});
			}
			return done(null,user);	
		})
}))