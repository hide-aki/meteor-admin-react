import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

  Accounts.emailTemplates.siteName = 'Sistema';
  Accounts.emailTemplates.from = 'Sistema <danielpinna2@gmail.com>';

  //Criação da conta
  Accounts.emailTemplates.enrollAccount = {
    subject(user) {
       return `${user.profile.name}, bem-vindo ao Sistema!`
    },
    text(user, url) {
       return `Olá ${user.profile.name}! Para ativar sua conta, basta copiar e colar na barra de endereços este link : ${url}`;
    }
  };

  //Verificação da conta
  Accounts.emailTemplates.verifyEmail = {
    subject() {
       return "Validação de email";
    },
    text(user, url) {
       return `Olá ${user.profile.name}! Para confirmar seu email, basta copiar e colar na barra de endereços este link : ${url}`;
    }
  };

  //Reset de senha
  Accounts.emailTemplates.resetPassword = {
    subject() {
       return "Sistema - Password Reset";
    },
    text(user, url) {
       return `Olá ${user.profile.name}! Para resetar sua senha, basta copiar e colar na barra de endereços este link : ${url}`;
    }
  };

});
