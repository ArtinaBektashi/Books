import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {}

  async sendResetPasswordEmail(to: string, token: string) {
    const mailConfig = this.configService.get('mail');

    const transporter = nodemailer.createTransport({
      service: mailConfig.transport.service,
      auth: {
        user: mailConfig.transport.auth.user,
        pass: mailConfig.transport.auth.pass,
      },
    });

    const resetPasswordUrl = `${mailConfig.resetPasswordUrl}?token=${token}`;

    const mailOptions = {
      from: mailConfig.fromEmail,
      to,
      subject: 'Reset your password',
      html: `
        <p>Please click <a href="${resetPasswordUrl}">here</a> to reset your password.</p>
        <p>If you didn't request a password reset, please ignore this email.</p>
      `,
    };

    return transporter.sendMail(mailOptions);
  }
}