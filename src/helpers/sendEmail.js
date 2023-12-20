const nodemailer = require('nodemailer')

const emailVerifyAccount = async (datos) => {
    const { email, name, token } = datos;
  
    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true, // use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  
    // Información del email
  
    const info = await transport.sendMail({
      from: '"ChallengeMe" <admin@challengeme.com>',
      to: email,
      subject: "ChallengeMe - Comprueba tu cuenta",
      text: "Comprueba tu cuenta en Chalenger",
      html: `<p>Hola: ${name}, Verifica tu cuenta en ChallengeMe y comienza con nuevos desafíos!!</p>
      <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: 
      
      <a href=https://challengesme.vercel.app/verify-account/${token}">Verifica tu cuenta para poder ser un Challenger</a>
      
      <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
      
      
      `,
    });
  };

  module.exports = {
    emailVerifyAccount
  }
