
var crypto = require('crypto');
User = require('../models/user');
module.exports = function(app){
  
  app.get('/', function(req, res) {
    res.render('index', { title: '首頁', 
                          user: req.session.user, 
                          success: req.flash('success').toString(), 
                          error: req.flash('error').toString()
                        });
           
  });



  app.get('/reg', function(req, res) {
    res.render('reg', { title: '註冊' , 
                        user: req.session.user, 
                        success: req.flash('success').toString(), 
                        error: req.flash('error').toString()
                      });
  });
  app.post('/reg', function(req, res){
      var name = req.body['name'],
          password = req.body['password'],
          password_re = req.body['password-repeat'];
      if (password_re != password){
        req.flash('error', '兩次輸入密碼不一樣!');
        return res.redirect('/reg');//return to registration page
      }
      //encrypt password
      var md5 = crypto.createHash('md5'),
          password = md5.update(req.body['password']).digest('hex');
      console.log(name, password, password_re);

      //create new user object
      var newUser = new User({
          name: req.body['name'],
          password: password,
          email: req.body['email']
      });

      //check if user is existing
      User.get(newUser.name, function(err, user){
          if(user){
              req.flash('error', '使用者已存在!');
              return res.redirect('/reg');
          }
          newUser.save(function(err, user){
              if(err){
                  req.flash('error', err);
                  return res.redirect('/reg');
              }
              req.session.user = user; //save user data into session
              req.flash('success', '註冊成功!');
              console.log("create user: " + newUser.name);
              req.session.user = user;
              res.redirect('/');
          });
      });
  });


  //處理登入頁面  
  app.get('/login', function(req, res){
    res.render("login", {
        title: "Login",
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
    console.log("有人試著登入!");
  });
  
  
  
  app.post('/login', function(req, res) {
    var md5 =  crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    //Check if user is in db
    User.get(req.body.name, function(err, user){
      //If user does not exist
      if(!user){
          req.flash('error', "沒這個人");
          res.redirect('/login');
      }
      //Check password
      if(user){
          console.log(name,"使用者存在!");
          var password = crypto.createHash('md5').update(loginUser.password).digest('hex');

          if (password == user.password){
              console.log(name,"登陸成功");
              req.session.user = user;
              req.flash('success','登陸成功!');
              res.redirect('/');
          }
          else{
              req.flash('error', "密碼錯誤!");
              return res.redirect('login');
          }
      }

      });
    });



  app.get('/post', function(req, res) {
    res.render('post', { title: '發表' });
  });
  app.post('/post', function(req, res) {
  });
  app.get('/logout', function(req, res) {
    res.render('logout', { title: '登出' });
  });
};

