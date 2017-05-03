
var express =   require("express");
var multer  =   require('multer');
var faceAPI = require('./ms-services/faceAPI.js');
var app  =   express();

const jsonServer = require('json-server')

app.use('/data', jsonServer.router('db.json'));



app.use(express.static('public'));


var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
  
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
 
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/detect',function(req,res){    
    upload(req,res,function(err) {

        if(err) {
            return res.end("Error uploading file.");
        }

        faceAPI.detect(req.file.path).then(function(data){
            let response = JSON.parse(data);
            let faceId = response[0].faceId;
            console.log("FaceId",faceId);
           

                faceAPI.identifyFace(faceId,"faces_great_personalities").
                    then(function(resp){
                        console.log(resp);
                        console.log("SUCCESS");
                           res.json(resp);
                    }).
                    catch(function(err){
                    
                        console.log("Error" , err.error);
                         res.status(500).send();

                    });

            
         

        })

      //  res.end("File is uploaded");
    });

    
});

app.post('/api/train',function(req,res){

    upload(req,res,function(err) {

        if(err) {
            return res.end("Error uploading file.");
        }

        faceAPI.addFaceToFaceList("Lakshmi","faces_great_personalities",req.file.path).
                then(function(data){
                   
                    console.log(data);
                    console.log("Success");
                     res.send(data);

                }).
                catch(function(err){

                  /*  console.log(JSON.stringify(err.error));*/
                    console.log("Error");
                    res.status(500).send();
                })

      //  res.end("File is uploaded");
    });


});



app.listen(3000,function(){
    console.log("Working on port 3000");
});