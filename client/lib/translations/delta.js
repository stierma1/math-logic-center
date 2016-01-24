

module.exports = function(key, initValue, dataSources, rename){
    var dataSource = dataSources.get(key);
    var newName = rename ? rename : key + "Delta";
    var prevVal = initValue ? initValue : null;
    var hit = (prevVal !== null);

    var newSource = dataSource.map(function(val){
      var delta;
      if(prevVal === null){
        prevVal = val;
      }
      delta = val - prevVal;

      prevVal = val;
      return delta;
    }).filter(function(){
      if(hit){
        return hit;
      } else {
        hit = true;
        return false;
      }
    });

    dataSources.get("creationMap").set(newName, key, [key, initValue], "delta");
    dataSources.set(newName, newSource);
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("delta", module.exports);
}
