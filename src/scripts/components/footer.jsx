var React         = require('react');
var Bootstrap     = require('react-bootstrap');
var Router        = require('react-router');
var Link          = Router.Link;
var Grid          = Bootstrap.Grid;
var Row           = Bootstrap.Row;
var Col           = Bootstrap.Col;
var moment        = require('moment');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      currentYear: moment().year()
    }
  },

  render: function(){
    return (
      <footer>
        <Grid>
          <Row>
            <Col xs={12} sm={4}>
              <Link to="home"><img src="images/footer-logo.jpg"/></Link>
              <span className="clearfix">{this.state.currentYear + ". All Rights Reserved."}</span>
            </Col>
            <Col xs={12} sm={8}>
              <ul className="inline-list">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Terms of Use</a></li>
                <li><a href="#">Sitemap</a></li>
              </ul>
            </Col>
          </Row>
        </Grid>
      </footer>
    )
  }
})