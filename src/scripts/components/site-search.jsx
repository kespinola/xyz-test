var React           = require('react');
var Bootstrap       = require('react-bootstrap');
var Input           = Bootstrap.Input;
var cx              = require('classnames');



module.exports = React.createClass({
  render: function(){
    return (
      <form className={cx("inline-form", this.props.className)}>
        <Input ref="search" type="text" placeholder="Type your search here..."/>
        <button type="submit" className="btn btn-primary"><i className="search"></i></button>
      </form>
    )
  }
})