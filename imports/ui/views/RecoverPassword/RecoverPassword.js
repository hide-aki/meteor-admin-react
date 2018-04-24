import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base'

// Components
import ModalDanger from '../Components/ModalDanger/';

class RecoverPassword extends Component {
  constructor(props){
    super(props);
    this.sendResetPassword = this.sendResetPassword.bind(this);
    this.toggleShow = this.toggleShow.bind(this);

    this.state = {
      email: '',
      detailError:'',
      formSubmited: false,
      sendResetPasswordFailure: false,
      showError: false,
    }    
  }

  handleInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  sendResetPassword(e){
    e.preventDefault();
    this.setState({['formSubmited']: true});

    if(this.state.email.length === 0) {
      this.setState({showError: true});
      return false;
    }

    Accounts.forgotPassword({email: this.state.email}, (err) => {
      if(err){
        this.setState({
          sendResetPasswordFailure: true,
          showError: true,
          detailError: err.reason,
        });
      } else {
        this.setState({
          sendResetPasswordFailure: false,
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
    let emailRequired = (this.state.email.length === 0 && this.state.formSubmited);
    let sendResetPasswordFailure = (this.state.sendResetPasswordFailure && this.state.formSubmited);

    let divError;
    if(emailRequired) {
      divError = <ModalDanger type="danger" toggleShow={this.toggleShow} show={this.state.showError} title="Campos Obrigatórios" msg="O campo email é obrigatório."/>
    } else if(sendResetPasswordFailure) {
      divError = <ModalDanger type="danger" toggleShow={this.toggleShow} show={this.state.showError} title="Erro Interno" msg="Ops...falha ao enviar email de alteração de senha." detailError={this.state.detailError}/>
    } else {
      divError = <ModalDanger type="success" toggleShow={this.toggleShow} show={this.state.showError} title="Alteração de Senha" msg="Alteração de senha enviada com sucesso."/>
    }

    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card mx-4">
                <div className="card-block p-4">
                  {divError}
                  <h1>Reset de senha</h1>
                  <div className={emailRequired ? "input-group mb-3 has-danger has-feedback" : "input-group mb-3"}>
                    <span className="input-group-addon">@</span>
                    <input type="text" name="email" value={this.state.email} onChange={(event) => this.handleInput(event)} className="form-control" placeholder="Email"/>
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
