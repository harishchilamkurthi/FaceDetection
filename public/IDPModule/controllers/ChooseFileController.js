(function(app){

  class ChooseFileController{
    constructor($element,$scope){
        this.$element = $element;
        this.fileName="";
        this.$scope = $scope;
    }

    displayImage(file){

            var reader = new FileReader();

            reader.onload =(e) => {
                this.$element[0].querySelector('#blah').src=  e.target.result
                    //  .querySelector('[src]', e.target.result);
                    
            };

            reader.readAsDataURL(file);
        }

    attachFile(){
        let fileInput = this.$element[0].querySelector('input#fileInput');
        fileInput.click();
        
     

    }

    uploadFile(){
        let file =  this.$element[0].querySelector('input#fileInput').files[0];
        this.onUpload({file:file});
    }

    $postLink(){
        var input = angular.element(this.$element[0].querySelector('input#fileInput'));
        input.bind("change",(e)=>{
            this.$scope.$apply(()=>{    
                 var files = e.target.files;
                    if (files[0]) {
                    this.fileName = files[0].name;
                    this.displayImage(files[0]);
                    } else {
                    this.fileName = null;
                    }
            });

        });

    }
}

 /**** Choose file component */
     app.component("chooseFile",{

        bindings:{
          onUpload:"&?"
        },

        template:` 
                <div layout="row">
                  <img id="blah" style="width:200px;height:200px"></img>

                  <input id="fileInput" type="file" class="ng-hide" flex="90">
                  <md-input-container flex class="md-block">
                    <input type="text" ng-model="$ctrl.fileName" disabled>
                    <div class="hint">Select your file</div>
                  </md-input-container>
                
                  <md-button id="attachFile" class="md-fab md-mini md-block" ng-click="$ctrl.attachFile()" flex="2">
                    <md-icon class="material-icons">attach_file</md-icon>
                  </md-button>
                  <div>
                      <md-button id="uploadButton" class="md-raised md-primary" ng-click="$ctrl.uploadFile()" flex="8   ">
                          Upload
                      </md-button>
                 </div>
                  </div>`,
          
        controller:['$element','$scope',ChooseFileController]


    });

    


})(exports.IDPModule);

