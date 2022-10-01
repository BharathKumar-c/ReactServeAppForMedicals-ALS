import { OTPService } from '../services';
import { Response, Request } from 'express';

const { sendOtpToUser, verifyOtpCode } = OTPService;

const sendOtp = async (req: Request, res: Response) => {
  const { value, type } = req.body;

  if (!value || !type) {
    return res.sendStatus(400);
  }

  try {
    await sendOtpToUser({ value, type });
    return res.sendStatus(200);
  } catch (error: any) {
    return res.status(400).send({ message: error?.message || '' });
  }
};

const verifyOtp = async (req: Request, res: Response) => {
  const { value, type, otp } = req.body;

  if (!value || !type || !otp) {
    return res.sendStatus(400);
  }

  try {
    const result = await verifyOtpCode({ value, type, otp });
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).send({ message: error?.message || '' });
  }
};

export default { sendOtp, verifyOtp };
