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
        <Navbar brand={<Link to="home"><img src="images/logo.png" /></Link>} toggleNavKey={0}>
          <CollapsableNav  eventKey={0}>
            <Nav navbar center className="nav-links">
              <NavItem eventKey={1} href='/about'>About</NavItem>
              <NavItem eventKey={2} href='/rates'>Rates</NavItem>
              <NavItem eventKey={3} href='/requirements'>Requirements</NavItem>
              <NavItem eventKey={4} href='/faq'>FAQ</NavItem>
              <NavItem eventKey={5} href='/apply'>Apply</NavItem>
            </Nav>
            <Nav navbar right>
              <SiteSearch className="hidden-xs" />
            </Nav>
          </CollapsableNav>
        </Navbar>
      </header>
    )
  }
});