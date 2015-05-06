var React        = require('react');
var Router       = require('react-router');
var RouteHandler = Router.RouteHandler;
var Header       = require('./header');
var Home         = require('./home');
var Footer       = require('./footer');

module.exports = React.createClass({

  render: function(){
    return (
      <section id="app">
        <Header {... this.props}/>
        <Home />
        <Footer />
      </section>
    )
  }
});