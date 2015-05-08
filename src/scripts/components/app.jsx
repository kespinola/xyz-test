var React        = require('react');
var Router       = require('react-router');
var RouteHandler = Router.RouteHandler;
var Header       = require('./header');
var Home         = require('./home');
var Footer       = require('./footer');

module.exports = React.createClass({

  getInitialState:function(){
    return {
      opacity:0
    }
  },

  render: function(){
    return (
      <section id="app" style={{opacity:this.state.opacity}}>
        <Header {... this.props}/>
        <Home />
        <Footer />
      </section>
    )
  },

  componentDidMount: function(){
    setTimeout(function(){
      this.setState({opacity:1})
    }.bind(this),250)
  }
});