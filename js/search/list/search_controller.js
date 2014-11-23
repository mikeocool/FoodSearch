FoodSearchApp.module("Search.List", function(List, FoodSearchApp, Backbone, Marionette, $, _) {
    var ListController = Marionette.Controller.extend({
        show: function() {
            this.collection = FoodSearchApp.Entities.SearchResultsCollection; 

            var searchLayout = new List.Layout();
            this.searchPanelView = new List.SearchForm({
                collection: this.collection
            });
            var searchResultsView = new List.SearchResults({
                collection: this.collection
            });

            searchLayout.on("show", _.bind(function(){
                searchLayout.headerRegion.show(this.searchPanelView);
                searchLayout.resultsRegion.show(searchResultsView);
                this.searchPanelView.focus();
            }, this));

            FoodSearchApp.mainRegion.show(searchLayout);

            this.searchPanelView.on("search:filter", _.bind(function(searchTerm) {
                this.filter(searchTerm);
            }, this));

            searchResultsView.on("search:next-page", function() {
                collection.fetchNextPage();
            });
        },
        filter: function(searchTerm) {
            // TODO update form, and navigate
            FoodSearchApp.navigate(searchTerm);
            this.collection.setFilter(searchTerm);
        }
    });

    List.Controller = new ListController();
});