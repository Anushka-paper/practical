const express = require('express');
const session= require('express-session');
const app=express();
const port=3000;
const users={
    admin:"password123",
    user:"user"
};
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:'your_secret_key',
    saveUninitialized:true,
    cookie:{maxAge:6000}
}));

// login route 

app.post('/login',(req,res)=>{
    const {username,password}=req.body;
    if(users[username] && users[username]===password){
        req.session.username=username;
        res.send('Welcome ${username} Session Started');
    }else{
        res.send('Invalid username or password');
    }
});

// protected route only accessible if logged in

app.get('/dashboard',(req,res)=>{
    if(req.session.username){
        res.send('Welcome to the dashboard, ${req.session.username}');
    }else{
        res.send('Please login to access the dashboard');
    }
});

// logout route
app.get('/logout',(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            return res.send('Error logging out');
        }
        res.send('Logged out successfully');
    });
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});