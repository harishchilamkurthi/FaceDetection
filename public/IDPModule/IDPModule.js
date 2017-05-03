  let exports = {};
  (function(angular){

    let app = angular.module("IDPModule",[]);
    app.service("FaceAPIService",['$http',FaceAPIService]);

    exports.IDPModule = app;

  
})(angular);