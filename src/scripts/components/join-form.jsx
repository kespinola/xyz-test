var React                     =  require('react/addons');
var ReactCSSTransitionGroup   = React.addons.CSSTransitionGroup;
var Bootstrap                 = require('react-bootstrap');
var Input                     = Bootstrap.Input;
var Col                       = Bootstrap.Col;
var Row                       = Bootstrap.Row;
var _                         = require('lodash');
var request                   = require('superagent');
var DropdownList              = require('react-widgets/lib/DropdownList');
var DateTimePicker            = require('react-widgets/lib/DateTimePicker');
var validator                 = require('validator');
var cx                        = require('classnames');

var CityState = React.createClass({

  getDefaultProp: function(){
    return {
      state:{
        value:"",
        error:false
      },
      city:{
        value:"",
        error:false
      }
    }
  },

  getInitialState: function(){
    return {
      states: require('../../../fixtures/states.json'),
      city:this.props.city,
      state:this.props.state
    }
  },

  getCityState: function(){
    request
      .get("http://ZiptasticAPI.com/" + this.props.zip.value)
      .end(function(err,res){
        res = JSON.parse(res.text);
        var update = {city:{value:res.city.toLowerCase()}, state:{value:res.state.toLowerCase()}};
        this.props.onChange("city",res.city);
        this.props.onChange("state",res.state);
        this.setState(update);
      }.bind(this))
  },

  onDropdownChange: function(val){
    this.props.onChange("state",val.abbreviation);
    this.setState({state:{value:val}})
  },

  render:function(){
    return (
      <Row>
        <Field name="city" type="text" label="City" value={this.state.city.value} bsStyle={this.state.city.error ? "error" : "success"} />
        <Col xs={6}>
          <div className="form-group">
            <label>State</label>
              <DropdownList
                onChange={this.onDropdownChange}
                value={this.state.state.value}
                data={this.state.states}
                valueField="abbreviation"
                textField="name"
              />
          </div>
        </Col>
      </Row>
    )
  },

  componentDidMount: function(){
    if(!_.isEmpty(this.props.zip) && _.isEmpty(this.state.city.value)) this.getCityState();
  }
});

var Field = React.createClass({
  getDefaultProps: function(){
    return {
      name:"",
      type:"text",
      options:[],
      label:null,
      require:true,
      bsStyle:"",
      value:""
    }
  },

  onChange: function(e){
    this.props.onChange(this.props.name, e.target.value)
  },

  renderInput: function() {
    return (
      <Input ref="input" type={this.props.type} value={this.props.value} bsStyle={this.props.bsStyle} required={this.props.required} label={this.props.label} onChange={this.onChange}/>
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
      previous:0,
      submitText:"next",
      firstName:{
        value:"",
        error:false
      },
      lastName:{
        value:"",
        error:false
      },
      email:{
        value:"",
        error:false
      },
      zip:{
        value:"",
        error:false
      },
      city:{
        value:"",
        error:false
      },
      state:{
        value:"",
        error:false
      },
      dob:{
        value:"",
        error:false
      },
      phone:{
        value:"",
        error:false
      },
      pay1:{
        value:"",
        error:false
      },
      pay2:{
        value:"",
        error:false
      },
      employmentType:{
        value:"",
        error:false
      },
      employmentName:{
        value:"",
        error:false
      }
    }
  },

  onSubmit: function(e){
    e.preventDefault();
    var valid = true;
    var update = {};

    _.forEach(this.props.steps[this.state.current].split(","), function(field){
      var value = this.state[field].value;

      update[field] = {value:value, error:_.isEmpty(value) && !_.isDate(value)};

      if(update[field].error){
        valid = false;
      }
    }.bind(this));

    if(!valid ){
      this.setState(update);
      return false;
    }

    this.setState(_.merge({current: ++this.state.current, previous:this.state.current},update, {submitText:this.state.current == this.props.steps.length - 1 ? "submit" : "next"}))

  },

  onInputChange: function(input, val){

    var update = {};
    update[input] = {value:val, error:this.state[input].error};

    this.setState(update);

  },

  onClickBack: function(){
    this.setState({current: --this.state.current, previous:this.state.current})
  },

  renderStep0: function(){
    return (
      <section key={0}>
        <Row>
          <Field name="firstName" type="text" label="First Name" value={this.state.firstName.value} bsStyle={this.state.firstName.error ? "error" : "success"} onChange={this.onInputChange} />
          <Field name="lastName" type="text" label="Last Name" value={this.state.lastName.value} bsStyle={this.state.lastName.error ? "error" : "success"} onChange={this.onInputChange} />
        </Row>
        <Row>
          <Field name="email" type="email" label="Email Address" value={this.state.email.value} bsStyle={this.state.email.error ? "error" : "success"} onChange={this.onInputChange} />
          <Field name="zip" type="text" label="Zip Code" value={this.state.zip.value} bsStyle={this.state.zip.error ? "error" : "success"} onChange={this.onInputChange} />
        </Row>
      </section>
    )
  },

  renderStep1: function(){
    return (
      <section key={1}>
          <CityState zip={this.state.zip} state={this.state.state} city={this.state.city} onChange={this.onInputChange} />
        <Row>
          <Col xs={6}>
            <div className="form-group">
              <label>Birthdate</label>
                <DateTimePicker time={false}  onChange={value => this.setState({dob:{value:value, error:_.isDate(value)}})} />
            </div>
          </Col>
          <Field name="phone" type="text" label="Phone Number" value={this.state.phone.value} bsStyle={this.state.phone.error ? "error" : ""} onChange={this.onInputChange} />
        </Row>
      </section>
    )
  },

  renderStep2: function(){
    return (
      <section key={2}>
        <Row>
          <Col xs={6}>
            <div className="form-group">
              <label>Pay Date 1</label>
                <DateTimePicker time={false}  onChange={value => this.setState({pay1:{value:value, error:_.isDate(value)}})} />
            </div>
          </Col>
          <Col xs={6}>
            <div className="form-group">
              <label>Pay Date 2</label>
                <DateTimePicker time={false}  onChange={value => this.setState({pay2:{value:value, error:_.isDate(value)}})} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <div className="form-group">
              <label>Employment Type</label>
                <DropdownList
                  value={this.state.employmentType.value}
                  onChange={value => this.setState({employmentType:{value:value}})}
                  data={["developer","designer","product manager"]}
                  placeholder="select"
                />
            </div>
          </Col>
          <Field name="employmentName" type="text" label="Employment Name"  value={this.state.employmentName.value} bsStyle={this.state.employmentName.error ? "error" : ""} onChange={this.onInputChange} />
        </Row>
      </section>
    )
  },

  renderStep3: function(){
    return (
      <section key={3}>
        <h2>Thank you for joining! You rock.</h2>
      </section>
    )
  },

  getTransition:function(){
    return this.state.previous == this.state.current || this.state.current > this.state.previous ? "slide-right" : "slide-left"
  },

  render: function() {
    return (
      <form onSubmit={this.onSubmit} className={cx("step-form", this.props.steps.length == this.state.current ? "last" : "")} autoComplete={false}>
        <h2>Do This Thing!</h2>
        <ReactCSSTransitionGroup component="div" className="step-wrap" transitionName="step-switch">{this["renderStep"+ this.state.current]()}</ReactCSSTransitionGroup>
        <Row componentClass="footer">
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
});