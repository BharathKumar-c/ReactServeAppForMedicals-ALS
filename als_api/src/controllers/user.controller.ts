import { UserService } from '../services';
import { Response, Request } from 'express';

const { getUserDeatilsById } = UserService;

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

export default { getUser };
