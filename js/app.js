var FoodSearchApp = new Marionette.Application();

FoodSearchApp.addRegions({
    mainRegion: '#main-region'
})

FoodSearchApp.on("start", function() {
    FoodSearchApp.Search.List.Controller.show();
});