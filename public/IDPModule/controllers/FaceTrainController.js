(function(app){
    class FaceTrainController{
    constructor($element,FaceAPIService){
        console.log("FaceTrainController initialized");
        this.$element = $element;
        this.FaceAPIService = FaceAPIService;
    }

    uploadFile(file){
        
         this.FaceAPIService.trainFace(file).then((response)=>{
             this.results = `Reference uuid ${response.data.persistedFaceId}`
             this.FaceAPIService.saveFaceDetails(response.data.persistedFaceId,{name:this.name,liveIn:this.livesIn,occupation:this.occupation}).then((response)=>console.log(response));

         }).catch((error)=> console.error(error));
    }

    openFileDialog(){
        console.log("Choose.....");

        this.$element[0].querySelector("#userPhoto").click();

    }

}

/***  Face train component */

    const FACE_TRAIN = "faceTrain";

    const faceTrainComponent =  {

       template:` 
                <md-card>
                  <md-card-header>
                
                    <md-card-header-text>
                      <span class="md-title">Train</span>
                 
                    </md-card-header-text>
                  </md-card-header>

                  <md-card-content>
                    <div layout="row">
                         <md-input-container>
                            <label>Name:</label>
                            <input type="text" ng-model="$ctrl.name">
                        </md-input-container>
                        <md-input-container>
                            <label>Lives in:</label>
                            <input type="text" ng-model="$ctrl.livesIn">
                        </md-input-container>
                        <md-input-container>
                            <label>Occupation:</label>
                            <input type="text" ng-model="$ctrl.occupation">
                        </md-input-container>
                    </div>
                    <choose-file on-upload="$ctrl.uploadFile(file)"></choose-file>
                    <div ng-if="$ctrl.results">
                        {{$ctrl.results}}
                    </div>
                  </md-card-content>
                </md-card>`,
        controller:['$element',"FaceAPIService",FaceTrainController]

    }
   app.component(FACE_TRAIN,faceTrainComponent);


})(exports.IDPModule);
