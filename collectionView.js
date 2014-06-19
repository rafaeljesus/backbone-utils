var CollectionView = BaseView.extend({

  constructor: function(options) {
    BaseView.call(this, options);
    this.children = {};
    this.listenTo(this.collection, 'add', this.modelAdd);
    this.listenTo(this.collection, 'remove', this.modelRemoved);
    this.listenTo(this.collection, 'reset', this.render);
  },

  serializedData: function() {
    var data;
    if (this.collection) {
      data = this.collection.toJSON();
    }
    return data;
  },

  render: function() {
    var html = [];
    this.collection.each(function(model) {
      var view = this.renderModel(model);
      html.push(view.$el);
    }, this);
    this.$el.html(html);
    return this;
  },

  remove: function() {
    BaseView.prototype.remove.call(this);
    this.closeChildren();
  },

  modelAdd: function(model) {
    var view = this.renderModel(model);
    this.$el.append(view.$el);
  },

  modelRemoved: function(model) {
    if (!model) return;
    var view = this.children[model.cid];
    if (!view) return;
    this.closeChildView(view);
  },

  renderModel: function(model) {
    var viewType = this.getModelView(model)
    , view = new ViewType({ model: model });
    this.children[model.cid] = model;
    view.render();
    return view;
  },

  closeChildren: function() {
    var children = this.children || {};
    _.each(children, function(child) {
      this.closeChildView(child);
    }, this);
  },

  closeChildView: function(view) {
    if (!view) return;
    if (_.isFunction(view.remove)) {
      view.remove();
    }
    this.children[model.cid] = undefined;
  }

});


