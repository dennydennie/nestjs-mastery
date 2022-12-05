import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  async sendMail(email: string, title: string, text: string, url: string) {
    const msg = {
      to: email,
      from: process.env.SENDGRID_SENDER,
      subject: title,
      text: text,
      html: `<p>${text}</p>
      <p><strong>Click <a href=${url}>here</a> to proceed</strong></p>`,
    };

    const mailer = require('@sendgrid/mail');

    mailer.setApiKey(process.env.SENDGRID_API_KEY);
    try {
      await mailer.send(msg);
    } catch (error) {
      console.error(error);
    }

    return;
  }
}
