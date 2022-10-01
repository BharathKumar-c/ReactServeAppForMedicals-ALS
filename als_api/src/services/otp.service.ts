import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { EmailService, SMSService } from '.';
import db from '../model';
const { Op } = require('sequelize');

const { TempEmailPhone, Sequelize } = db;

const { sendEmail } = EmailService;

const sendOtpToUser = async ({
  value,
  type
}: {
  value: string;
  type: otp_type;
}) => {
  try {
    var randomOTP = Math.floor(1000 + Math.random() * 9000);
    await TempEmailPhone.destroy({ where: { value } });
    if (type === 'email') {
      await sendEmail({
        to: value,
        subject: 'Verify Your OTP',
        body: `Your Verification OTP Code is ${randomOTP}`
      });
      await TempEmailPhone.create({
        type,
        value,
        otp: randomOTP,
        sentTime: new Date(),
        isVerified: false
      });
    } else if (type === 'phone') {
      const otp = await SMSService.sendSMS({
        message: `Your Verification OTP Code is ${randomOTP}`,
        phone: value
      });
      await TempEmailPhone.create({
        type,
        value,
        otp: randomOTP,
        sentTime: new Date(),
        isVerified: false
      });
    }
  } catch (error) {
    throw error;
  }
};

const verifyOtpCode = ({
  value,
  type,
  otp
}: {
  value: string;
  type: string;
  otp: string;
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      await TempEmailPhone.update(
        {
          noOfAttempts: Sequelize.literal(
            `${TempEmailPhone.rawAttributes.noOfAttempts.field} + 1`
          )
        },
        { where: { value } }
      );

      const record = await TempEmailPhone.findOne({
        where: {
          value,
          type,
          otp,
          isVerified: false,
          sentTime: {
            [Op.gte]: moment().subtract(2, 'minute').toDate()
          }
        }
      });
      if (record) {
        const token = uuidv4();
        await record.update({ isVerified: true, token });
        resolve({ token, type });
      } else {
        return reject(Error('The OTP you entered is invalid or expired'));
      }
    } catch (error) {
      return reject(error);
    }
  });
};

export default { sendOtpToUser, verifyOtpCode };
