// Configuration about Meteor accounts

import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

  Accounts.emailTemplates.siteName = 'Sistema';
  Accounts.emailTemplates.from = 'Sistema <danielpinna2@gmail.com>';
  Accounts.config({ 
    loginExpirationInDays: 0.01, 
    sendVerificationEmail: true
  });
  
  //Criação da conta
  Accounts.emailTemplates.enrollAccount = {
    subject(user) {
       return `${user.username}, bem-vindo ao Sistema!`
    },
    text(user, url) {
       return `Olá ${user.username}! Para ativar sua conta, basta copiar e colar na barra de endereços este link : ${url}`;
    }
  };

  //Verificação da conta
  Accounts.emailTemplates.verifyEmail = {
    subject() {
       return "Validação de email";
    },
    text(user, url) {
       return `Olá ${user.username}! Para confirmar seu email, basta copiar e colar na barra de endereços este link : ${url}`;
    }
  };

  //Reset de senha
  Accounts.emailTemplates.resetPassword = {
    subject() {
       return "Sistema - Password Reset";
    },
    text(user, url) {
       return `Olá ${user.username}! Para resetar sua senha, basta copiar e colar na barra de endereços este link : ${url}`;
    }
  };

});
