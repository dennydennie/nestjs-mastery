import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsService {
  async send(phone: string, otp: string) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    const from = process.env.TWILIO_FROM;
    try {
      await client.messages.create({
        body: `Your verification code is ${otp} `,
        from: from,
        to: phone,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
