var Layout = ModelView.extend({

  render: function() {
    this.closeRegions();
    var result = ModelView.prototype.render.call(this);
    this.configureRegions();
    return result;
  },

  configureRegions: function() {
    var regionsDefinitions = this.regions || {};
    _.each(regionsDefinitions, function(selector, name) {
      var el = this.$(selector);
      this[name] = new Region({ el: el });
    }, this);
  },

  close: function() {
    Layout.prototype.close.call(this);
    this.closeRegions();
  },

  closeRegions: function() {
    _.each(this.regions, function(selector, name) {
      var region = this[name];
      if (region && _.isFunction(region.close)) {
        region.close();
      }
    }, this);
  }

});