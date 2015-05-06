var React       =  require('react/addons');
var Bootstrap   = require('react-bootstrap');
var Input       = Bootstrap.Input;
var Col         = Bootstrap.Col;
var Row         = Bootstrap.Row;
var _           = require('lodash');
var request     = require('superagent');
var DropdownList    = require('react-widgets/lib/DropdownList');
var DateTimePicker          = require('react-widgets/lib/DateTimePicker');

var CityState = React.createClass({

  getDefaultProp: function(){
    return {
      city:"",
      state:"",
      zip:""
    }
  },

  getInitialState: function(){
    return {
      states: require('../../../fixtures/states.json'),
      city:this.props.city
    }
  },

  getCityState: function(){
    request
      .get("http://ZiptasticAPI.com/" + this.props.zip)
      .end(function(err,res){
        res = JSON.parse(res.text);
        this.setState({city:res.city, state:res.state})
      }.bind(this))
  },

  render:function(){
    return (
      <Row>
        <Col xs={6}>
          <div className="form-group">
            <label>City
              <Input type="text" value={this.state.city}  />
            </label>
          </div>
        </Col>
        <Col xs={6}>
          <div className="form-group">
            <label>City
              <DropdownList
                value={this.state.state}
                data={this.state.states}
                valueField="abbreviation"
                textField="name"
              />
            </label>
          </div>
        </Col>
      </Row>
    )
  },

  componentDidMount: function(){
    if(!_.isEmpty(this.props.zip)) this.getCityState();
  }
});

var Field = React.createClass({
  getDefaultProps: function(){
    return {
      name:"",
      type:"text",
      options:[],
      label:null,
      require:true
    }
  },

  onChange: function(e){
    this.props.onChange(this.props.name, e.target.value)
  },

  renderInput: function() {
    return (
      <Input ref="input" type={this.props.type} required={this.props.required} label={this.props.label} onChange={this.onChange}/>
    )
  },

  renderSelect: function(){
    return (
      <select onChange={this.onChange}></select>
    )
  },

  render: function(){
    return (
      <Col xs={6}>
      {this.props.type == "select" ? this.renderSelect() : this.renderInput()}
      </Col>
    )
  }
});

module.exports = React.createClass({

  getDefaultProps: function(){
    return {
      steps:[
        "firstName,lastName,email,zip",
        "city,state,dob,phone",
        "pay1,pay2,employmentType,employmentName"
      ]
    }
  },

  getInitialState:function(){
    return {
      current:0,
      submitText:"next",
      firstName:"",
      lastName:"",
      email:"",
      zip:"",
      city:"",
      state:"",
      dob:"",
      phone:""
    }
  },

  onSubmit: function(e){
    e.preventDefault();
    var valid = true;

    _.forEach(this.props.steps[this.state.current].split(","), function(field){
        if(_.isEmpty(this.state[field])) valid = false;
    }.bind(this));

    if(!valid ) return false;

    if(this.state.current == this.props.steps.length - 1){
      this.submit();
    }else{

      this.setState({current: ++this.state.current})
    }
  },

  onInputChange: function(input, val){

    var update = {};
    update[input] = val;
    this.setState(update);

  },

  onClickBack: function(){
    this.setState({current: --this.state.current})
  },

  renderStep0: function(){
    return (
      <section>
        <Row>
          <Field name="firstName" type="text" label="First Name" onChange={this.onInputChange} />
          <Field name="lastName" type="text" label="Last Name" onChange={this.onInputChange} />
        </Row>
        <Row>
          <Field name="email" type="email" label="Email Address" onChange={this.onInputChange} />
          <Field name="zip" type="text" label="Zip Code" onChange={this.onInputChange} />
        </Row>
      </section>
    )
  },

  renderStep1: function(){
    return (
      <section>
          <CityState zip={this.state.zip} />
        <Row>
          <Col xs={6}>
            <div className="form-group">
              <label>Birthdate
                <DateTimePicker time={false} onChange={value => this.setState({dob:value })} />
              </label>
            </div>
          </Col>
          <Field name="phone" type="text" label="Phone Number" onChange={this.onInputChange} />
        </Row>
      </section>
    )
  },

  renderStep2: function(){
    return (
      <section>
        <Row>
          <Field name="pay1" type="text" label="Pay Date 1" onChange={this.onInputChange} />
          <Field name="pay2" type="text" label="Pay Date 2" onChange={this.onInputChange} />
        </Row>
        <Row>
          <Field name="employmentType" type="select" label="Employment Type" onChange={this.onInputChange} />
          <Field name="employmentName" type="text" label="Employment Name" onChange={this.onInputChange} />
        </Row>
      </section>
    )
  },

  render: function() {
    return (
      <form onSubmit={this.onSubmit} className="step-form" autoComplete="off">
        <h2>Do This Thing!</h2>
        <div className="step-wrap">
        {this["renderStep"+ this.state.current]()}
        </div>
        <Row>
          <Col xs={6}>
            {this.state.current > 0 ? <button className="btn btn-default" onClick={this.onClickBack}>Back</button> : null}
          </Col>
          <Col xs={6}>
            <button className="btn btn-primary" type="submit">{this.state.submitText}</button>
          </Col>
        </Row>
      </form>
    )
  }
})