(function () {

  angular.module('app.services.categories', [])

    .factory('CategoriesService', function ($http) {
      var $connectionString = "http://localhost:8080/farmit/";

      return {
        get_categories: function () {
          return $http({
            method: 'POST',
            url: $connectionString + 'api/categories/get_categories'
          })
            .success(function ($returnedData) {
              return $returnedData;
            })
            .error(function ($returnedData) {
              return $returnedData;
            });
        }
      };
    })

    .factory('SubcategoriesService', function ($http) {
      var $connectionString = "http://localhost:8080/farmit/";

      return {
        get_subcategories: function ($category_id) {
          return $http({
            method: 'POST',
            url: $connectionString + 'api/categories/get_subcategories',
            data: "category_id=" + $category_id,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
            .success(function ($returnedData) {
              return $returnedData;
            })
            .error(function ($returnedData) {
              return $returnedData;
            });
        }
      };
    })
})();
