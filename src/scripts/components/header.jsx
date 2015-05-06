var React             = require('react');
var Router            = require('react-router');
var Link              = Router.Link;
var Bootstrap         = require('react-bootstrap');
var Navbar            = Bootstrap.Navbar;
var DropdownButton    = Bootstrap.DropdownButton;
var CollapsableNav    = Bootstrap.CollapsableNav;
var Nav               = Bootstrap.Nav;
var NavItem           = Bootstrap.NavItem;
var MenuItem          = Bootstrap.MenuItem;
var Grid              = Bootstrap.Grid;
var Col               = Bootstrap.Col;
var Row               = Bootstrap.Row;
var Button            = Bootstrap.Button;
var OverlayTrigger    = Bootstrap.OverlayTrigger;
var Tooltip           = Bootstrap.Tooltip;
var ModalTrigger      = Bootstrap.ModalTrigger;
var _                 = require('lodash');
var SiteSearch        = require('./site-search');




module.exports = React.createClass({

  render: function(){
    return (
      <header>
        <Navbar brand={<Link to="home"><img src="images/logo.png" className="img-responsive"/></Link>} toggleNavKey={0}>
          <CollapsableNav  eventKey={0}>
            <Nav navbar right>
              <SiteSearch />
            </Nav>
          </CollapsableNav>
        </Navbar>
      </header>
    )
  }
});