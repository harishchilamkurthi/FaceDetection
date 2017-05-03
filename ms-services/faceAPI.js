let rp = require('request-promise');
let fs = require("fs");
let MS_COGNITIVE_DETECT_URL = "https://westus.api.cognitive.microsoft.com/face/v1.0/detect";
let MS_COGNITIVE_SUBSCRIPTION_KEY = "bd607c32ecb24656a4f51e7e1407f9e8";
class FaceAPI{

    
    detect(localFaceFilePath){
        let promise = new Promise((resolve,reject) => {
            fs.readFile(localFaceFilePath, function(err, data) {
                    let params = {
                            // Request parameters
                            "returnFaceId": "true",
                            "returnFaceLandmarks": "false"
                        
                        };
            
                        
                    let options = {
                        method: 'POST',
                        uri: "https://westus.api.cognitive.microsoft.com/face/v1.0/detect",
                        body: data,
                        qs:params,
                        headers:{
                            "Content-Type":"application/octet-stream",
                            "Ocp-Apim-Subscription-Key":MS_COGNITIVE_SUBSCRIPTION_KEY
                        }
                    
                    };

                    rp(options).
                        then(function(data){
                            resolve(data);
                        }).
                        catch(function(err){

                            reject(err);
                        })
            
        
            });

        });

        return promise;
      }

    addFaceToFaceList(userData,facelistId,localFaceFilePath){
      let promise = new Promise((resolve,reject) => {

             fs.readFile(localFaceFilePath, function(err, data) {
                    let params = {
                        // Request parameters
                        "faceListId":facelistId,
                        "userData": userData,
                    
                    };
            
                        
                    let options = {
                        method: 'POST',
                        uri: "https://westus.api.cognitive.microsoft.com/face/v1.0/facelists/{faceListId}/persistedFaces",
                        body: data,
                        qs:params,
                        headers:{
                            "Content-Type":"application/octet-stream",
                            "Ocp-Apim-Subscription-Key":MS_COGNITIVE_SUBSCRIPTION_KEY
                        }
                    
                    };

                rp(options).
                    then(function(data){
                        resolve(data);
                    }).
                    catch(function(err){

                        reject(err);
                    })
        
            });

      });

      return promise;
      
    }

    identifyFace(faceId,faceListId){
        console.log(faceId,faceListId);
                let params={};
                 let options = {
                    method: 'POST',
                    uri: "https://westus.api.cognitive.microsoft.com/face/v1.0/findsimilars",
                    body: {    
                        "faceId":faceId,
                        "faceListId":faceListId,  
                        "maxNumOfCandidatesReturned":1,
                        "mode": "matchPerson"
                    },
                   
                    headers:{
                        "Content-Type":"application/json",
                        "Ocp-Apim-Subscription-Key":MS_COGNITIVE_SUBSCRIPTION_KEY
                    },
                    json:true
                   
                  
                };

                return rp(options);


    }


}

module.exports = new FaceAPI();