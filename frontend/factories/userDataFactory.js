main_module.factory('userDataFactory', function ($resource) {
    var factory = {};
    factory.saveData = function(data) {
        var req = $resource('/userData', {}, {'post':{method:'PUT'}});
        return req.post(data).$promise;
    }
    //factory must always return an object!!
    return factory;
});