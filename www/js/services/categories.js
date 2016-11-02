(function () {

  angular.module('app.services.categories', [])

    .factory('CategoriesService', function ($http, SERVER) {
      return {
        get_categories: function () {
          var $url = SERVER.url + 'api/categories/get_categories';

          return $http.post($url, null)
            .success(function ($returnedData) {
              return $returnedData;
            })
            .error(function ($returnedData) {
              return $returnedData;
            });
        }
      };
    })

    .factory('SubcategoriesService', function ($http, SERVER) {
      return {
        get_subcategories: function ($category_id) {
          var $url = SERVER.url + 'api/categories/get_subcategories';

          var $parameters =
          {
            "category_id": $category_id
          };

          return $http.post($url, $parameters)
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
