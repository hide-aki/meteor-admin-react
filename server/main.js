import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

  Accounts.emailTemplates.from = 'Gestao Igrejas <contato@gestaoigrejas.com.br>';
  
  //Verificação da conta
  Accounts.emailTemplates.verifyEmail = {
    subject() {
       return "Confirme seu email";
    },
    text(user, url) {
       return `Olá ${user.profile.name}! Para confirmar seu email, basta clicar no link : ${url}`;
    }
  };

});
