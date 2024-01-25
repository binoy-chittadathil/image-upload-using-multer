const express=require('express');
const path = require('path');
const multer=require('multer');
const app=express();

// Multer storage configuration
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname)
    }
})
// Multer middleware setup
const upload=multer({storage:storage})

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})
app.post('/submit',upload.single('image'),(req,res)=>{
    const file=req.file;
    console.log(file);
    console.log(req.body)
    if(!file){
        return res.status(400).send('no file uploaded');
    }
    res.send('file uploaded')
    
})


app.listen(3000,()=>console.log('server started'))