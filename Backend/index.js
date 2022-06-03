const express=require("express")
const app=express()
const port=process.env.port|5000
const mysqlconnector=require("./mysql_connector")
const multer=require("multer")  //npm install multer
const cors=require("cors")      //npm install cors
const fileSystem=require("fs")
app.use(cors())
const path = require('path');

//app.use(express.static(__dirname)); // Current directory is root
app.use(express.static(path.join(__dirname, './public/images'))); //  "public" off of current is root

const fileStorageEngine=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public/images")
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now() + "--" + file.originalname)
    },
})
const upload=multer({storage:fileStorageEngine})


app.get("/",(req,res)=>{
    res.sendFile('index.html', { root: __dirname } )
})

app.post("/single",upload.single("image"),(req,res)=>{
    console.log(req.file)
    console.log(req.body.category)
    console.log(req.file.path)

   
    var imageName=req.file.filename
    var imageCategory=req.body.category
    var imageUrl=`http://localhost:${port}/${imageName}`
    mysqlconnector.getConnection((err,connection)=>{
        if(err)
        {
            connection.release()            
            res.send(err)
            res.end()
        }
        else
        {
            connection.release()
            var q="insert into gallery(imageName,imageTag,imageUrlName) values('"+imageName+"','"+imageCategory+"','"+imageUrl+"')"
            connection.query(q,(err,result)=>{
                if(err)
                {
                    res.send(err)
                    res.end()

                }
                else
                {
                    res.send("image has been uploaded")
                    res.end()
                }
            })
        }
    })
    
})


app.post("/delete/:imageName",(req,res)=>{
    
    var {imageName}=req.params
    console.log(imageName)
    fileSystem.unlink(`./public/images/${imageName}`,(err)=>{
        if (err) throw err
    })
    mysqlconnector.getConnection((err,connection)=>{
        if(err)
        {
            connection.release()
            res.send(err)
            res.end()
        }
        else
        {
            connection.release()    
            var q="delete from gallery where imageName='"+imageName+"'";
            connection.query(q,(err,result)=>{
                if(err)
                {
                    res.send(err)
                    res.end()
                }
                else
                {
                    res.send("Image has been deleted")
                    res.end()
                }
            })
        }
    })
})

app.get("/extract",(req,res)=>{
    mysqlconnector.getConnection((err,connection)=>{
        if(err)
        {
            connection.release()
            res.send(err)
            res.end()
        }
        else
        {
            var q="select * from gallery"
            connection.query(q,(err,result)=>{
                if(err)
                {
                    connection.release()
                    res.send(err)
                    res.end()
                }
                else{
                    connection.release()
                    res.send(result)
                    res.end()
                }
            })
        }
    })
})


/* app.post("/multiple",upload.array("images",3),(req,res)=>{
    console.log(req.files)
    res.send("Multiple files upload success")
}) */

app.post("/rename/:oldName/:category/:newName",(req,res)=>{

    const {oldName,category,newName}=req.params
    console.log(oldName)
    console.log(newName)
    console.log(category)
    fileSystem.rename(`./public/images/${oldName}`,`./public/images/${newName}`,function(err){
        if(err)
        {
            console.log(err)
        }
        else
        {
            console.log("File Renamed Successfully")
        }
    })

    mysqlconnector.getConnection((err,connection)=>{
        if(err)
        {
            connection.release()
            res.send(err)
            res.end()
        }
        else
        {
            connection.release()
            var q="update gallery set imageName='"+newName+"',imageTag='"+category+"',imageUrlName='"+`http://localhost:5000/${newName}`+"' where imageName='"+oldName+"'"
            connection.query(q,(err,result)=>{
                if(err)
                {
                    res.send(err)
                    res.end()
                }
                else
                {
                    res.send("Image details has been updated")
                    res.end()
                }
            })
        }
    })
})


app.listen(port,()=>{
    console.log(`Listen server http://localhost:${port}`)
})