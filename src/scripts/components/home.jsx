var React             = require('react');
var Bootstrap         = require('react-bootstrap');
var Jumbotron         = Bootstrap.Jumbotron;
var Well              = Bootstrap.Well;
var Grid              = Bootstrap.Grid;
var Col               = Bootstrap.Col;
var Row               = Bootstrap.Row;
var Block             = require('./block');
var JoinForm          = require('./join-form');

module.exports = React.createClass({
  render: function(){
    return (
      <article>
        <Jumbotron>
          <Grid>
            <Row>
              <Col xs={12} sm={6}>
                <h1>Lorem <strong>ipsum</strong> dolor sit amet, consectetur</h1>
              </Col>
              <Col xs={12} sm={6}>
                <Well><JoinForm/></Well>
              </Col>
            </Row>
          </Grid>
        </Jumbotron>
        <Grid>
          <Row>
            <Block
              header="Consectetur, Adipiscing Elit"
              content="Chambray bushwick you probably haven't heard of them biodiesel fingerstache ethical, chillwave vegan food truck farm-to-table four loko DIY hella beard. Jean shorts street art artisan leggings, wolf organic. This is a link organic echo park occupy, pour-over Austin wayfarers cosby sweater umami leggings swag shoreditch fap. Messenger bag Austin vinyl artisan."
            />
            <Block
              header="Lorem ipsum dolor sit amet"
              content="Butcher whatever gluten-free shoreditch bespoke, mumblecore echo park DIY. Blog narwhal salvia, locavore stumptown umami dreamcatcher bicycle rights wolf portland 8-bit mcsweeney's. Chambray portland VHS vinyl pork belly. Mlkshk vice ethical pork belly fanny pack, shoreditch viral fap. Austin art party VHS +1 direct trade williamsburg flexitarian locavore stumptown."
            />
          </Row>
          <Row>
            <Block
              sm={12}
              header="Lorem ipsum dolor sit amet"
              content="Chambray bushwick you probably haven't heard of them biodiesel fingerstache ethical, chillwave vegan food truck farm-to-table four loko DIY hella beard. Jean shorts street art artisan leggings, wolf organic. Echo park occupy, pour-over Austin wayfarers cosby sweater umami leggings swag shoreditch fap. Messenger bag Austin vinyl artisan."
            />
          </Row>
          <Row>
            <Col xs={12}>
              <h1>This is a very important header</h1>
              <h2>This is also an important header</h2>
              <h3>This is important too</h3>
              <strong>Everything is important, really</strong>
              <p>Butcher whatever gluten-free shoreditch bespoke, mumblecore echo park DIY. Blog narwhal salvia, locavore stumptown umami dreamcatcher bicycle rights wolf portland 8-bit mcsweeney's. Chambray portland VHS vinyl pork belly. Mlkshk vice ethical pork belly fanny pack, shoreditch viral fap. Austin art party VHS +1 direct trade williamsburg flexitarian locavore stumptown umami dreamcatcher bicycle rights wolf cray. Etsy photo booth cosby sweater forage. You probably haven't heard of them biodiesel fingerstache ethical, chillwave vegan food truck farm-to-table four loko DIY hella beard. Jean shorts street art artisan leggings, wolf organic. Echo park occupy, pour-over Austin wayfarers cosby sweater umami leggings swag shoreditch fap.</p>
            </Col>
          </Row>
        </Grid>
      </article>
    )
  }
})