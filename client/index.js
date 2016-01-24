var $ = require("jquery");

module.exports = function(windowSlotsObj){
  var utils = windowSlotsObj.utils;
  var dataSources = windowSlotsObj.dataSources;
  require("./lib/translations/equation").initialize(dataSources);
  require("./lib/contents/equation-translation")(dataSources, utils);
  require("./lib/translations/delta").initialize(dataSources);
  require("./lib/contents/delta-translation")(dataSources, utils);
  require("./lib/translations/accumulate").initialize(dataSources);
  require("./lib/contents/accumulate-translation")(dataSources, utils);
  require("./lib/translations/filter").initialize(dataSources);
  require("./lib/contents/filter-translation")(dataSources, utils);
  require("./lib/translations/heaviside").initialize(dataSources);
  require("./lib/contents/heaviside-translation")(dataSources, utils);
  require("./lib/translations/distance").initialize(dataSources);
  require("./lib/contents/distance-translation")(dataSources, utils);
}

/*
$(document).ready(function(){
  var createWindowFrame = require("window-slots")["window-slots"];
  var funcs = createWindowFrame($("body"));
  module.exports(funcs);
  funcs.createWindowSlot();
  funcs.loadContent("window-frame-editor",1);

  //var t = '[{"key":"tRollingBatch","from":"tRolling","args":["tRolling",2],"type":"batch"},{"key":"tRolling","from":"t","args":["t",3],"type":"rolling"},{"key":"t","from":null,"args":[{"url":"http://jsonplaceholder.typicode.com/posts/1","method":"GET"},null],"type":"http-request"}]'
  //var s = JSON.parse(t);

  //funcs.buildCreationPath(s, funcs.dataSources)
});*/
