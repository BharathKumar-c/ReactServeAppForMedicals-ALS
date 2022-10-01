const AWS = require('aws-sdk');

const AWS_CONFIG = {
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
};
AWS.config.update(AWS_CONFIG);

const AWS_SES = new AWS.SES();

const AWS_SNS = new AWS.SNS({ apiVersion: '2010-03-31' });

export default {
  AWS_SES,
  AWS_SNS
};

