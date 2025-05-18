const http=requre("http");
const fs=require("fs");
const user={
    user:"password123",
    admin:"userpass"
};
const server=http.createServer((req,res)=>{
    if(req.method==='GET' && req.url==='/'){
        fs.readFile('index.html',(err,data)=>{
            if(err){
                res.writeHead(500,{'Content-Type':'text/plain'});
                res.end('Server Error');
            }else{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.end(data);
            }
        })
    }
    else if(req.method==='POST' && req.url==='/register'){
        let body='';
        req.on('data',(chunk)=>{
            body+=chunk.toString();
        });
        req.on('end',()=>{
            const params=new URLSearchParams(body);
            const username=params.get('username');
            const password=params.get('password');
            if(user[username]){
                res.writeHead(400,{'Content-Type':'text/plain'});
                res.end('User already exists');
            }else{
                user[username]=password;
                res.writeHead(200,{'Content-Type':'text/plain'});
                res.end('User registered successfully');
            }
        })
    }
    else{
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.end('Not Found');   
    }
    server.listen(3000,()=>{
        console.log('Server is running on port 3000');
    })

})