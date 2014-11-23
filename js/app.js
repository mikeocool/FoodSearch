var FoodSearchApp = new Marionette.Application();

FoodSearchApp.addRegions({
    mainRegion: '#main-region'
})

FoodSearchApp.navigate = function(route, options) {
    options || (options = {});
    Backbone.history.navigate(route, options);
}

FoodSearchApp.getCurrentRoute = function() {
    return Backbone.history.fragment;
}

FoodSearchApp.on("start", function() {
    if(Backbone.history) {
        Backbone.history.start();
        if(this.getCurrentRoute() === "") {
            //trigger empty search view
        }
    }
});