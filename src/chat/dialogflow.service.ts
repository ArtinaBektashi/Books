import * as dotenv from 'dotenv';
import { SessionsClient } from '@google-cloud/dialogflow';
import { Injectable } from '@nestjs/common';

dotenv.config();

@Injectable()
export class DialogflowService {
  private sessionClient: SessionsClient;

  constructor() {
    this.sessionClient = new SessionsClient();
  }

  async sendMessage(sessionId: string, message: string): Promise<string> {
    const sessionPath = this.sessionClient.projectAgentSessionPath(
      process.env.PROJECT_ID,
      sessionId
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: 'en-US',
        },
      },
    };

    const responses = await this.sessionClient.detectIntent(request);

    const result = responses[0].queryResult;
    return result.fulfillmentText;
  }
}