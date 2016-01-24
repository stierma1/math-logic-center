var $ = require("jquery");

module.exports = function(dataSources, utils){

  var contentFactory = {
    load : function(rerender){
      var value = [];
      var suppressRerender = false;
      var filter = dataSources.get("translations").get("filter");

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
          var source1Select = $("<select></select>");
          var source2Select = $("<select></select>");

          value.map(function(key){
            source1Select
              .append($("<option></option>")
              .attr("value",key)
              .text(key));

            source2Select
              .append($("<option></option>")
              .attr("value",key)
              .text(key));
          });

          var renameField = $("<input type='text'></input>")

          var createButton = $("<input type='button' value='Create'></input>")
            .click(function(){
              var source1 = source1Select.val();
              var source2 = source2Select.val();
              var name = renameField.val();

              if(source1 && source2){
                filter(source1, source2, dataSources, name);
              }
            });

          return $("<span></span>")
            .append($("<div></div>").append($("<span>Control: </span>")).append(source1Select).append($("<span>Source: </span>")).append(source2Select))
            .append($("<div></div>").append($("<span>Name: </span>")).append(renameField))
            .append(createButton);

        }, unload: function(){
          suppressRerender = true;
          dataSources.removeListener("change", handler);
        }
      };
    }
  };

  dataSources.get("contentTypes").set("filter-translation", contentFactory);
}
