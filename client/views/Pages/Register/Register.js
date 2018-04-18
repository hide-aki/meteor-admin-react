import React, { Component } from 'react';

// Components
import ModalDanger from '../../Components/ModalDanger/';

class Register extends Component {
  constructor(props){
    super(props);
    this.register = this.register.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    
    this.state = {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      detailError:'',
      formSubmited: false,
      registerFailure: false,
      showError: false,
    }
  }

  register(e){
    e.preventDefault();
    this.setState({['formSubmited']: true});

    if(this.state.name.length === 0 || this.state.email.length === 0 || this.state.password.length === 0 || this.state.repeatPassword.length === 0) {
      this.setState({showError: true});
      return false;
    } else if(this.state.password !== this.state.repeatPassword) {
      this.setState({showError: true});
      return false;
    }

    Accounts.createUser({email: this.state.email, username: this.state.name, password: this.state.password}, (err) => {
      if(err){
        this.setState({
          registerFailure: true,
          showError: true,
          detailError: err.reason,
        });
        console.log(err);
      } else {
        this.props.history.push('/');
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
    let nameRequired = (this.state.name.length === 0 && this.state.formSubmited);
    let emailRequired = (this.state.email.length === 0 && this.state.formSubmited);
    let passwordRequired = (this.state.password.length === 0 && this.state.formSubmited);
    let repeatPasswordRequired = (this.state.repeatPassword.length === 0 && this.state.formSubmited);
    let registerFailure = (this.state.registerFailure && this.state.formSubmited);

    let divError;
    if(nameRequired || emailRequired || passwordRequired || repeatPasswordRequired) {
      divError = <ModalDanger type="danger" toggleShow={this.toggleShow} show={this.state.showError} title="Campos Obrigatórios" msg="Todos os campos são obrigatórios."/>
    } else if(this.state.password !== this.state.repeatPassword) {
      divError = <ModalDanger type="danger" toggleShow={this.toggleShow} show={this.state.showError} title="Validação" msg="Campo senha e confirmação de senha estão diferentes."/>
    } else if(registerFailure) {
      divError = <ModalDanger type="danger" toggleShow={this.toggleShow} show={this.state.showError} title="Erro Interno" msg="Ops...falha ao criar usuário." detailError={this.state.detailError}/>
    }

    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card mx-4">
                <div className="card-block p-4">
                  {divError}
                  <h1>Registrar</h1>
                  <p className="text-muted">Crie sua conta</p>
                  <div className={nameRequired ? "input-group mb-3 has-danger has-feedback" : "input-group mb-3"}>
                    <span className="input-group-addon"><i className="icon-user"></i></span>
                    <input type="text" name="name" value={this.state.name} onChange={(event) => this.handleInput(event)} className="form-control" placeholder="Nome completo"/>
                  </div>
                  <div className={emailRequired ? "input-group mb-3 has-danger has-feedback" : "input-group mb-3"}>
                    <span className="input-group-addon">@</span>
                    <input type="text" name="email" value={this.state.email} onChange={(event) => this.handleInput(event)} className="form-control" placeholder="Email"/>
                  </div>
                  <div className={passwordRequired ? "input-group mb-3 has-danger has-feedback" : "input-group mb-3"}>
                    <span className="input-group-addon"><i className="icon-lock"></i></span>
                    <input type="password" name="password" value={this.state.password} onChange={(event) => this.handleInput(event)} className="form-control" placeholder="Senha"/>
                  </div>
                  <div className={repeatPasswordRequired ? "input-group mb-4 has-danger has-feedback" : "input-group mb-4"}>
                    <span className="input-group-addon"><i className="icon-lock"></i></span>
                    <input type="password" name="repeatPassword" value={this.state.repeatPassword} onChange={(event) => this.handleInput(event)} className="form-control" placeholder="Repita a senha"/>
                  </div>
                  <button type="button" onClick={this.register} className="btn btn-block btn-success">Criar Conta</button>
                </div>
                {/* <div className="card-footer p-4">
                  <div className="row">
                    <div className="col-6">
                      <button className="btn btn-block btn-facebook" type="button"><span>facebook</span></button>
                    </div>
                    <div className="col-6">
                      <button className="btn btn-block btn-twitter" type="button"><span>twitter</span></button>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
