var Region = (function(Backbone, $) {

  function Region(options) {
    this.el = options.el;
    this.currentView =  = undefined;
  }

  Region.prototype = {

    closeView: function(view) {
      if (view && view.remove) {
        view.remove();
      }
    },

    openView: function(view) {
      this.ensureEl();
      view.render();
      this.$el.html(view.el);
    },

    show: function(view) {
      this.closeView(this.currentView);
      this.currentView = view;
      this.openView(view);
      if (_.isFunction(view.onShow)) {
        view.onShow();
      }
    },

    ensureEl: function() {
      if (this.$el) return;
      this.$el = $(this.el);
    }

  };

  return Region;

})(Backbone, jQuery);