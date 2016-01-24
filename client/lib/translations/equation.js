
var Equation = require("../equation-extended");

module.exports = function(key, equationStr, dataSources, rename){
    var dataSource = dataSources.get(key);
    var newName = rename ? rename : key + "Equation";

    var newSource = dataSource.map(function(val){

      if(val instanceof Array){
        var newEq = equationStr;
        for(var i = 0; i < val.length; i++){
          newEq = newEq.replace(new RegExp("\\{" + i + "\\}"), val[i].toString());
        }

        return Equation.solve(newEq);
      } else {
        var newEq = equationStr.replace(/\{0\}/,val.toString());

        return Equation.solve(newEq);
      }
    })
    .publish()
    .refCount();

    dataSources.get("creationMap").set(newName, key, [key, equationStr], "equation");
    dataSources.set(newName, newSource);
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("equation", module.exports);
}
