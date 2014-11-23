FoodSearchApp.module("Search.List", function(List, FoodSearchApp, Backbone, Marionette, $, _) {
    List.Layout = Marionette.LayoutView.extend({
        template: "#search-layout",
        regions: {
            headerRegion: "#search-header",
            resultsRegion: "#search-results"
        }
    });

    List.SearchForm = Marionette.ItemView.extend({
        template: "#search-form",
        events: {
            "submit form": "search"
        },
        setSearchTerm: function(searchTerm) {
            this.$('[name=search-term]').val(searchTerm);
        },
        search: function(e) {
            e.preventDefault();    
            searchTerm = this.$('[name=search-term]').val();
            console.log(searchTerm);
            this.trigger("search:filter", searchTerm);
        }
    });

    List.SearchResult = Marionette.ItemView.extend({
        tagName: "li",
        className: "media",
        template: "#search-result-item",
        serializeData: function() {
            var data = this.model.toJSON();
            _.extend(data, {
                'image': this.model.getImage()
            });
            return data;
        }
    });

    List.EmptyResult = Marionette.ItemView.extend({
        template: "#no-search-results"
    });

    List.SearchResults = Marionette.CompositeView.extend({
        triggers: {
            "click .load-more":"search:next-page"
        },
        template: "#search-results-list",
        childView: List.SearchResult,
        childViewContainer: 'ul',
        getEmptyView: function() {
            if(this.collection.query) {
                return List.EmptyResult;
            }
            return null;
        },
        toggleLoadMore: function() {
            if(this.collection.hasNextPage()) {
                this.$('.load-more').show();
            } else {
                this.$('.load-more').hide();
            }
        },
        onRender: function() {
            this.toggleLoadMore();
        },
        onRenderCollection: function() {
            this.toggleLoadMore();
        }
    });
});