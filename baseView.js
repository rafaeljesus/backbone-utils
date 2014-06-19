var BaseView = Backbone.View.extend({

  constructor: function() {
    Backbone.View.prototype.constructor.apply(this, arguments);
    this.buildTemplateCache();
  },

  render: function() {
    var data;
    if (this.serializedData) {
      data = this.serializedData();
    }
    var compiledHtml = this.templateCache(data);
    if (this.onRender) {
      this.onRender();
    }
  },

  buildTemplateCache: function() {
    var proto = Object.getPrototypeOf(this);
    if (proto.templateCache) return;
    proto.templateCache = _.template(this.template);
  }

});