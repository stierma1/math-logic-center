var Rx = require("rx");

module.exports = function(key1, key2, dataSources, rename){
    var dataSource1 = dataSources.get(key1);
    var dataSource2 = dataSources.get(key2);

    var newName = rename ? rename : key1 + "-filter-" + key2;

    var newSource = Rx.Observable.zip(dataSource1, dataSource2)
      .filter(function(val){
        return val[0] === true || val[0] > .5;
      })
      .map(function(val){
        return val[1];
      });

    dataSources.get("creationMap").set(newName, [key1, key2], [key1, key2], "filter");
    dataSources.set(newName, newSource);
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("filter", module.exports);
}
