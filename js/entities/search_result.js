FoodSearchApp.module("Entities", function(Entities, FoodSearchApp) {
    var SearchResult = Backbone.Model.extend({
        getImage: function() {
            var pagemap = this.get('pagemap');
            if(pagemap) {
                if(pagemap.cse_thumbnail) {
                    return pagemap.cse_thumbnail[0].src;
                }
            }
            return null;
        }
    });

    var SearchResultsCollection = Backbone.Collection.extend({
        initialize: function(options) {
            this.resetPagination();
            this.pageSize = 10;
            this.nextIndex = null;
            this.totalItems = 0;
            this.query = null;
        },
        url: function() {
            var url = 'https://www.googleapis.com/customsearch/v1';
            var data = {
                key:config.gApiKey,
                cx:config.cseCx,
                num:this.pageSize,
                q:this.query
            };
            return url+'?'+$.param(data);
        },
        parse: function(resp, options) {
            if(resp.queries.nextPage) {
                this.nextIndex = resp.queries.nextPage[0].startIndex;
            } else {
                this.nextIndex = null;
            }
            this.totalItems = resp.searchInformation.totalResults;
            return resp.items;
        },
        hasNextPage: function() {
            return !! this.nextIndex;
        },
        fetchNextPage: function(options) {
            if( ! this.hasNextPage()) {
                throw new Error('No next page');
            }
            var options = _.extend({
                data:{
                    start:this.nextIndex
                }, 
                add:true, 
                remove:false, 
                merge:false
            }, options);

            this.fetch(options);
        },
        resetPagination: function() {
            this.nextIndex = null;
            this.totalItems = 0;
        },
        setFilter: function(query) {
            this.resetPagination();
            this.query = query;
            this.trigger('filter:changed');
            this.fetch({reset:true});
        },
        model: function(attrs, options) {
            return new SearchResult(attrs, options);
        }
    });
    
    Entities.SearchResultsCollection = new SearchResultsCollection();
});