

module.exports = function(key, threshold, dataSources, rename){
    var dataSource = dataSources.get(key);
    var newName = rename ? rename : key + "Heaviside";

    var newSource = dataSource.map(function(val){
      if(val >= threshold){
        return 1;
      }
      return 0;
    });

    dataSources.get("creationMap").set(newName, key, [key, threshold], "heaviside");
    dataSources.set(newName, newSource);
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("heaviside", module.exports);
}
