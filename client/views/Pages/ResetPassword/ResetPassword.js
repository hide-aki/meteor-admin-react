import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

class ResetPassword extends Component {

  constructor(props){
    super(props);
    this.resetPassword = this.resetPassword.bind(this);
    this.state = { 
      isAuthenticated: Meteor.userId() !== null,
      password: '',
      confirmPassword: '',
      formSubmited: false,
      token: props.match.params.token,
    };
  }

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  resetPassword(e){
    e.preventDefault();
    this.setState({['formSubmited']: true});
    alert(this.state.password + ' e ' +  this.state.confirmPassword + ' e token: ' + this.state.token);
    if(this.state.password === this.state.confirmPassword && (this.state.password !== '' && this.state.confirmPassword !== '')) {
      
      Accounts.resetPassword(this.state.token, this.state.password, function (err) {
        if (!err) {
            console.log('Password reset was a success!')
        } else {
            console.log(err);
        }
      });
      

    } else {
      alert("Senhas não conferem...");
    }
    
  }

  render() {
    let passwordRequired = (this.state.password.length === 0 && this.state.formSubmited);
    let confirmPasswordRequired = (this.state.confirmPassword.length === 0 && this.state.formSubmited);
    let passwordsIsDifferent = (this.state.confirmPassword !== this.state.password);

    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card mx-4">
                <div className="card-block p-4">
                  <h1>Redefina sua senha</h1>

                  <div className={passwordRequired ? "input-group mb-3 has-danger has-feedback" : "input-group mb-3"}>
                    <span className="input-group-addon"><i className="icon-lock"></i></span>
                    <input type="password" name="password" value={this.state.password} onChange={(event) => this.handleUserInput(event)} className="form-control" placeholder="Senha"/>
                  </div>

                  <div className={confirmPasswordRequired || passwordsIsDifferent ? "input-group mb-4 has-danger has-feedback" : "input-group mb-4"}>
                    <span className="input-group-addon"><i className="icon-lock"></i></span>
                    <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={(event) => this.handleUserInput(event)} className="form-control" placeholder="Repita a senha"/>
                  </div>
                  
                  <button type="button" onClick={this.resetPassword} className="btn btn-block btn-success">Redefinir</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
