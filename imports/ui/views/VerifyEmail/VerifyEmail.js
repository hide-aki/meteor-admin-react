import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

// Components

class VerifyEmail extends Component {
  constructor(props){
    super(props);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.state = { 
      token: props.match.params.token
    }
  }

  verifyEmail(e) {
    e.preventDefault();
    Accounts.verifyEmail(this.state.token, (err) => {
      if(err) {
        alert("erro");
        console.log(err);
      } else {
        alert("sucesso");
        console.log(err);
      }
    });
  }

  render() {

    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card mx-4">
                <div className="card-block p-4">
                  <h1>Verificação de e-mail</h1>
                  Clique no botão abaixo para confirmar a verificação de seu e-mail ;) <br /><br />
                  <button type="button" onClick={this.verifyEmail} className="btn btn-block btn-success">Verificar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VerifyEmail;
