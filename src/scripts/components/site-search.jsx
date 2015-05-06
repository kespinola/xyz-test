var React           = require('react');
var Bootstrap       = require('react-bootstrap');
var Input           = Bootstrap.Input;



module.exports = React.createClass({
  render: function(){
    return (
      <form className="inline-form">
        <Input ref="search" type="text" placeholder="Type your search here..."/>
        <button type="submit" className="btn btn-primary"><i className="search"></i></button>
      </form>
    )
  }
})