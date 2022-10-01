import { AWS_CONFIG } from '../config';

const { AWS_SNS } = AWS_CONFIG;

const sendSMS = async ({
  message,
  phone
}: {
  message: string;
  phone: string;
}) => {
  const params = {
    Message: message,
    PhoneNumber: phone
  };

  return AWS_SNS.publish(params).promise();
};

export default { sendSMS };
