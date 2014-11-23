FoodSearchApp.module("Search", function(SearchApp, FoodSearchApp, Backbone, Marionette, $, _) {
    SearchApp.on("start", function() {
        SearchApp.List.Controller.show();
    });

    SearchApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            ":searchTerm": "search"
        }
    });

    var API = {
        search: function(searchTerm) {
            SearchApp.List.Controller.filter(searchTerm);
        }
    };

    FoodSearchApp.addInitializer(function(){
        new SearchApp.Router({
            controller: API
        });
    });

});