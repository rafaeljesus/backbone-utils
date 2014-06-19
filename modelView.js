var ModelView = BaseView.extend({

  serializedData: function() {
    var data;
    if (this.model) {
      data = this.model.toJSON();
    }
    return data;
  }

});