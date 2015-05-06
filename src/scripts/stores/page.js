var Fluxxor     = require('fluxxor');
var constants   = require('../constants');
var _           = require('lodash');
var moment      = require('moment');
var ls          = require('local-storage');


var Store = Fluxxor.createStore({

  initialize:function(){
    this.store = [];
  }

});

module.exports = Store;