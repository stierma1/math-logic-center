

module.exports = function(key, dataSources, rename){
    var dataSource = dataSources.get(key);
    var newName = rename ? rename : key + "Distance";

    var newSource = dataSource.map(function(val){
      var acc = 0;
      for(var i = 0; i < val.length; i++){
        acc += val[i]*val[i];
      }
      return Math.sqrt(acc);
    });

    dataSources.get("creationMap").set(newName, key, [key], "distance");
    dataSources.set(newName, newSource);
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("distance", module.exports);
}
