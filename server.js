const http=require('http');
const { receiveMessageOnPort } = require('worker_threads');
let rurl='sdf';

const server=http.createServer(function(req,res){
    console.log("Method=> ",req.method);
    const mthd=req.method;
    if(mthd=='GET'){
        if(req.url=='/link'){
            res.end(rurl);
        }
    }
    else if(mthd=='POST'){
        let data='';
        if(req.url=='/link'){
            req.on('data',(chunk)=>{data+=chunk.toString();});
            // let parsedBody = JSON.parse(data);
            
            req.on('end', () => {
                try {
                    let parsedBody = JSON.parse(data); // Parse after receiving full data
                    rurl = parsedBody.url2; // Extract the needed value
                    res.end("rurl= " + rurl);
                } catch (error) {
                    res.end("Error: Invalid JSON");
                }
            });
            // res.end("rurl= "+rurl);
        }
        else{
            res.end("null");
        }
    }
});
const PORT=4000;
server.listen(PORT,function process(){
    console.log("Listening at PORT: ",PORT);
});
