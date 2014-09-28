(function(rootScope) {
  var Arr = require('arr');
  var mustache = require('mustache.js');
  var throttle = require('throttle');

  var List = function(data, el, itemTemplate) {
    
    if (! data instanceof Arr) {
      throw new Error('data should be an instance of Arr');
    }
   
    if (! el instanceof HTMLElement) {
      throw new Error('el should be an instanceof of HTMLElement');
    }
   
    if (typeof itemTemplate !== 'string') {
      throw new Error('itemTemplate should be a string');
    }
   
    if (typeof mustache === 'undefined') {
      throw new Error('mustache library is required');
    }
   
    if (typeof throttle === 'undefined') {
      throw new Error('throttle library is required');
    }
   
    this.data = data;
    this.el = el;
    this.itemTemplate = itemTemplate;
   
    this.data.on('change', throttle(this.render.bind(this), 300));
    
    if (this.data.length > 0) {
      this.render();
    }
  };
   
  List.prototype = {
    //
    clean: function() {
      if (this.el.firstChild) { 
        while (this.el.firstChild) {
            this.el.removeChild(this.el.firstChild);
        }
      }
   
      return this;
    },
   
    //
    render: function() {
      this.clean();
   
      if (this.data.length > 0) {
        for (var i=0,len=this.data.length; i<len; i++) {

          this.el.insertAdjacentHTML('beforeend', mustache.render(this.itemTemplate, {
            index: i,
            item: this.data[i]
          }));
        }
      }
      
      return this;
    }
  };

  if (typeof module !== 'undefined') {
    module.exports = List;
  } else {
    rootScope.List = List;
  }

})(this);
