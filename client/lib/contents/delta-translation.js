var $ = require("jquery");

module.exports = function(dataSources, utils){

  var contentFactory = {
    load : function(rerender){
      var value = [];
      var suppressRerender = false;
      var deltaTrans = dataSources.get("translations").get("delta");

      var handler = function(val){
        value = dataSources.keys().filter(function(val){
          return !utils.isCoreDataSource(val);
        });
        if(!suppressRerender){
          setTimeout(function(){rerender();},0);
        }
      };

      dataSources.on("change", handler);
      dataSources.once("subscribed", handler);
      dataSources.emit("subscribe");

      return {
        render : function(){
          var sourceSelect = $("<select></select>");

          value.map(function(key){
            sourceSelect
              .append($("<option></option>")
              .attr("value",key)
              .text(key));
          });
          var initField = $("<input type='text'></input>")
          var renameField = $("<input type='text'></input>")

          var createButton = $("<input type='button' value='Create'></input>")
            .click(function(){
              var source = sourceSelect.val();
              var initValue = initField.val();
              var name = renameField.val();
              if(initValue !== ""){
                initValue = parseFloat(initValue);
              }
              if(source){
                deltaTrans(source, initValue, dataSources, name);
              }
            });

          return $("<span></span>")
            .append($("<h3>Delta Translation</h3>"))
            .append($("<div></div>").append($("<span>Source: </span>")).append(sourceSelect))
            .append($("<div></div>").append($("<span>Initial Value: </span>")).append(initField))
            .append($("<div></div>").append($("<span>Name: </span>")).append(renameField))
            .append(createButton);

        }, unload: function(){
          suppressRerender = true;
          dataSources.removeListener("change", handler);
        }
      };
    }
  };

  dataSources.get("contentTypes").set("delta-translation", contentFactory);
}
