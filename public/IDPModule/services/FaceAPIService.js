class FaceAPIService{

    constructor($http){
        this.$http = $http;
    }

    trainFace(file){
          let fileFormData = new FormData();
          fileFormData.append('userPhoto', file);
                   
       let trainAPI =  this.$http.post("/api/train",fileFormData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}

            });

        return trainAPI;
    }

    detectFace(file){
          let fileFormData = new FormData();
          fileFormData.append('userPhoto', file);
                   
       let trainAPI =  this.$http.post("/api/detect",fileFormData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}

            });

        return trainAPI;
    }

    saveFaceDetails(persistedFaceId,details){
        return this.$http.post("/data/personalities",{id:persistedFaceId,details:details});
    }

    getFaceDetails(persistedFaceId){
       return this.$http.get(`/data/personalities/${persistedFaceId}`);
    }


}