import { Response, Request } from 'express';
import { AuthService, JWTService, UserService } from '../services';

const {
  checkEmailExists,
  createUser,
  checkUserCredentials,
  generateAccessTokenByRefreshToken,
  checkPhoneExists
} = AuthService;

const { getUserDeatilsById } = UserService;

const register = async (req: Request, res: Response) => {
  const {
    email,
    password,
    firstName,
    lastName,
    citizenship,
    country,
    phoneNumber
  } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ msg: 'All the required fields are needed' });
  }

  const exist = await checkEmailExists(email);
  if (exist) {
    return res.status(400).json({ msg: 'Email already exist' });
  }

  try {
    const user = await createUser({
      email,
      password,
      firstName,
      lastName,
      citizenship,
      country,
      phone: phoneNumber
    });
    const token = JWTService.generateUserTokens(user);
    return res.status(200).json({ token });
  } catch (error) {
    return res.sendStatus(400);
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'All the required fields are needed' });
  }
  try {
    const result = await checkUserCredentials(email, password);
    return res.status(200).json({ ...result });
  } catch (error: any) {
    return res.status(400).send({ message: error?.message || '' });
  }
};

const emailAlreadyExists = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.sendStatus(400);
  }

  try {
    const exist = await checkEmailExists(email);
    return res.status(200).json({ exist });
  } catch (error: any) {
    return res.status(400).send({ message: error?.message || '' });
  }
};

const phoneAlreadyExists = async (req: Request, res: Response) => {
  const { phone } = req.body;

  if (!phone) {
    return res.sendStatus(400);
  }

  try {
    const exist = await checkPhoneExists(phone);
    return res.status(200).json({ exist });
  } catch (error: any) {
    return res.status(400).send({ message: error?.message || '' });
  }
};

const getUser = async (req: Request, res: Response) => {
  const { userId } = req;

  if (!userId) {
    return res.sendStatus(400);
  }

  try {
    const result = await getUserDeatilsById(userId);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).send({ message: error?.message || '' });
  }
};

const refreshToken = (req: Request, res: Response) => {
  const REFRESH_TOKEN = req.headers['x-access-token']?.toString();

  if (!REFRESH_TOKEN) {
    return res.status(400).json({ msg: 'refresh_token header is required' });
  }

  return generateAccessTokenByRefreshToken(REFRESH_TOKEN)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err: any) => {
      return res.status(400).send({ message: err?.message || '' });
    });
};

export default {
  register,
  login,
  getUser,
  refreshToken,
  emailAlreadyExists,
  phoneAlreadyExists
};
