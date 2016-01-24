

module.exports = function(key, dataSources, rename){
    var dataSource = dataSources.get(key);
    var newName = rename ? rename : key + "Accumulate";
    var accum = 0;

    var newSource = dataSource.map(function(val){
      accum += val;
      return accum;
    });

    dataSources.get("creationMap").set(newName, key, [key], "accumulate");
    dataSources.set(newName, newSource);
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("accumulate", module.exports);
}
