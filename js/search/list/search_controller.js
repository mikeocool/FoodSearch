FoodSearchApp.module("Search.List", function(List, App, Backbone, Marionette, $, _) {
    var ListController = Marionette.Controller.extend({
        show: function() {
            var collection = App.Entities.SearchResultsCollection; 
            var searchLayout = new List.Layout();
            var searchPanelView = new List.SearchForm();
            var searchResultsView = new List.SearchResults({
                collection: collection
            });

            searchLayout.on("show", function(){
                searchLayout.headerRegion.show(searchPanelView);
                searchLayout.resultsRegion.show(searchResultsView);
            });

            FoodSearchApp.mainRegion.show(searchLayout);

            searchPanelView.on("search:filter", function(searchTerm) {
                collection.setFilter(searchTerm);
            });

            searchResultsView.on("search:next-page", function() {
                collection.fetchNextPage();
            });
        }
    });

    List.Controller = new ListController();
});