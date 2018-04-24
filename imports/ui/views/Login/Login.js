import React, { Component } from 'react';

// Components
import ModalDanger from '../Components/ModalDanger/'

class Login extends Component {
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
    this.goToRegister = this.goToRegister.bind(this);
    this.goToResetPassword = this.goToResetPassword.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    
    this.state = {
      isAuthenticated: Meteor.userId() !== null,
      email: '',
      password: '',
      formSubmited: false,
      loginFailure: false,
      showError: false,
    }
  }

  goToRegister(){
    this.props.history.push('/signup');
  }

  goToResetPassword(){
    this.props.history.push('/recover-password');
  }

  login(e){
    e.preventDefault();
    this.setState({['formSubmited']: true});
    Meteor.loginWithPassword(this.state.email, this.state.password, (err) => {
      if(err){
        this.setState({
          loginFailure: true,
          showError: true
        });
      } else {
        this.setState({loginFailure: false});
        this.props.history.push('/dashboard');
      }
    });
  }

  handleInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }
  
  toggleShow() {
    this.setState({
      showError: !this.state.showError
    });
  }

  render() {
    let emailRequired = (this.state.email.length === 0 && this.state.formSubmited);
    let passwordRequired = (this.state.password.length === 0 && this.state.formSubmited);
    let loginError = (this.state.loginFailure && this.state.formSubmited);

    let divError;
    if(emailRequired || passwordRequired) {
      divError = <ModalDanger type="danger" toggleShow={this.toggleShow} show={this.state.showError} title="Campos Obrigatórios" msg="Usuário e senha são campos obrigatórios."/>
    } else if(loginError) {
      divError = <ModalDanger type="danger" toggleShow={this.toggleShow} show={this.state.showError} title="Autenticação" msg="Ops...Usuário e/ou senha inválidos."/>
    }
    
    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card-group mb-0">
                <div className="card p-4">
                  <div className="card-block">
                    {divError}
                    <h1>Entrar</h1>
                    <p className="text-muted">Faça login em sua conta</p>
                    <div className={emailRequired ? "input-group mb-3 has-danger has-feedback" : "input-group mb-3"}>
                      <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                      <input type="text" name="email" value={this.state.email} onChange={(event) => this.handleInput(event)} className="form-control" placeholder="Email"/>
                    </div>
                    <div className={passwordRequired ? "input-group mb-4 has-danger has-feedback" : "input-group mb-4"}>
                      <span className="input-group-addon"><i className="icon-lock"></i></span>
                      <input type="password" name="password" value={this.state.password} onChange={(event) => this.handleInput(event)} className="form-control" placeholder="Senha"/>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <button type="button" onClick={this.login} className="btn btn-primary px-4">Entrar</button>
                      </div>
                      <div className="col-6 text-right">
                        <button type="button" onClick={this.goToResetPassword} className="btn btn-link px-0">Esqueceu a senha?</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card card-inverse card-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <div className="card-block text-center">
                    <div>
                      <h2>Inscrever-se</h2>
                      <p>Faça o cadastro e tenha acesso ao sistema agora mesmo. É muito fácil, basta clicar no botão abaixo e preencher o formulário de cadastro</p>
                      <button type="button" onClick={this.goToRegister} className="btn btn-primary active mt-3">Registrar Agora!</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
