import { AWS_CONFIG } from '../config';

const { AWS_SES } = AWS_CONFIG;

const sendEmail = ({
  from = 'bahirathy@itero.ie',
  to,
  subject,
  body
}: {
  from?: string;
  to: string;
  subject: string;
  body: string;
}) => {
  let params = {
    Source: from,
    Destination: {
      ToAddresses: [to]
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: body
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    }
  };
  return AWS_SES.sendEmail(params).promise();
};

export default { sendEmail };
