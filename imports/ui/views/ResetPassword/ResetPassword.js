import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

// Components
import ModalDanger from '../Components/ModalDanger/';

class ResetPassword extends Component {
  constructor(props){
    super(props);
    this.resetPassword = this.resetPassword.bind(this);
    this.toggleShow = this.toggleShow.bind(this);

    this.state = { 
      isAuthenticated: Meteor.userId() !== null,
      password: '',
      confirmPassword: '',
      token: props.match.params.token,
      detailError:'',
      formSubmited: false,
      resetPasswordFailure: false,
      showError: false,
    };
  }

  handleInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  resetPassword(e){
    e.preventDefault();
    this.setState({['formSubmited']: true});

    if(this.state.password.length === 0 || this.state.confirmPassword.length === 0) {
      this.setState({showError: true});
      return false;
    } else if(this.state.password !== this.state.confirmPassword) {
      this.setState({showError: true});
      return false;
    }
      
    Accounts.resetPassword(this.state.token, this.state.password, (err) => {
      if(err) {
        this.setState({
          resetPasswordFailure: true,
          showError: true,
          detailError: err.reason,
        });
        console.log(err);
      } else{
        this.setState({
          resetPasswordFailure: false,
          showError: true,
        });
      }
    });
  }

  toggleShow() {
    this.setState({
      showError: !this.state.showError
    });
  }

  render() {
    let passwordRequired = (this.state.password.length === 0 && this.state.formSubmited);
    let confirmPasswordRequired = (this.state.confirmPassword.length === 0 && this.state.formSubmited);
    let passwordsIsDifferent = (this.state.confirmPassword !== this.state.password);
    let resetPasswordFailure = (this.state.resetPasswordFailure && this.state.formSubmited);

    let divError;
    if(passwordRequired || confirmPasswordRequired) {
      divError = <ModalDanger type="danger" toggleShow={this.toggleShow} show={this.state.showError} title="Campos Obrigatórios" msg="Todos os campos são obrigatórios."/>
    } else if(passwordsIsDifferent) {
      divError = <ModalDanger type="danger" toggleShow={this.toggleShow} show={this.state.showError} title="Validação" msg="Campo senha e confirmação de senha estão diferentes."/>
    } else if(resetPasswordFailure) {
      divError = <ModalDanger type="danger" toggleShow={this.toggleShow} show={this.state.showError} title="Erro Interno" msg="Ops...falha ao realizar alteração de senha." detailError={this.state.detailError}/>
    } else {
      divError = <ModalDanger type="success" toggleShow={this.toggleShow} show={this.state.showError} title="Alteração de Senha" msg="Alteração de senha realizada com sucesso."/>
    }

    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card mx-4">
                <div className="card-block p-4">
                  {divError}
                  <h1>Redefina sua senha</h1>
                  <div className={passwordRequired ? "input-group mb-3 has-danger has-feedback" : "input-group mb-3"}>
                    <span className="input-group-addon"><i className="icon-lock"></i></span>
                    <input type="password" name="password" value={this.state.password} onChange={(event) => this.handleInput(event)} className="form-control" placeholder="Senha"/>
                  </div>
                  <div className={confirmPasswordRequired ? "input-group mb-4 has-danger has-feedback" : "input-group mb-4"}>
                    <span className="input-group-addon"><i className="icon-lock"></i></span>
                    <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={(event) => this.handleInput(event)} className="form-control" placeholder="Repita a senha"/>
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
