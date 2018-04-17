import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base'

class RecoverPassword extends Component {

  constructor(props){
    super(props);
    this.state = this.getMeteorData();
    this.sendResetPassword = this.sendResetPassword.bind(this);
  }
  
  getMeteorData(){
    return { 
      isAuthenticated: Meteor.userId() !== null,
      email: '',
      formSubmited: false,
    };
  }

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  sendResetPassword(e){
    e.preventDefault();
    this.setState({['formSubmited']: true});
    if(this.state.email.length > 0) {
      alert("OK");
      Accounts.forgotPassword({email: this.state.email});
    }
    
  }

  render() {
    let emailRequired = (this.state.email.length === 0 && this.state.formSubmited);

    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card mx-4">
                <div className="card-block p-4">
                  <h1>Reset de senha</h1>
                  <div className={emailRequired ? "input-group mb-3 has-danger has-feedback" : "input-group mb-3"}>
                    <span className="input-group-addon">@</span>
                    <input type="text" name="email" value={this.state.email} onChange={(event) => this.handleUserInput(event)} className={emailRequired ? "form-control form-control-danger" : "form-control form-control-success"} placeholder="Email"/>
                  </div>
                  <button type="button" onClick={this.sendResetPassword} className="btn btn-block btn-success">Enviar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecoverPassword;
