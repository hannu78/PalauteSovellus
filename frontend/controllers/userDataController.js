main_module.controller('userDataController', function ($scope, userDataFactory, $location, Flash) {
    $scope.tallennusClicked = function () {
        
        var kayttaja = {
            Nimi: $scope.name,
            email: $scope.email,
            Puhelin: $scope.phone, 
        };
        
        console.log("KAYTTAJA" + $scope.name);
        
        var waitPromise = userDataFactory.saveData(kayttaja);
        
        waitPromise.then (function (data) {
           // Code inside this block will be called when success response from server 
           // is received
            console.log("Success!");
            //console.log(data.secret);
            $location.path('/function').replace();
        }, function(data) {
            console.log ("Fail!");
            Flash.create('danger', 'Käyttäjätiedon lisäus epäonnistui.', 'custom-class'); 
            $('.error').text('Tarkista tiedot');             
        });
        
    }
});