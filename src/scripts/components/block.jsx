var React             = require('react');
var Bootstrap         = require('react-bootstrap');
var Col               = Bootstrap.Col;
var _                 = require('lodash');

module.exports = React.createClass({
  getDefaultProps:function(){
    return {
      xs:12,
      sm:6,
      header:null,
      content:null
    }
  },
  render: function(){
    return (
      <Col xs={this.props.xs} sm={this.props.sm}>
      {_.isNull(this.props.header) ? null : <h2>{this.props.header}</h2>}
      {_.isNull(this.props.content) ? null : <p>{this.props.content}</p>}
      </Col>
    )
  }
})