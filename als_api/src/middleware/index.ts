import { NextFunction, Request, Response } from 'express';
import { JWTService } from '../services';

const { verifyToken } = JWTService;

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> => {
  if (
    req.headers['x-access-token'] &&
    req.headers['x-access-token'].length > 0 &&
    req.headers['x-access-token-type']
  ) {
    const access_token = req.headers['x-access-token'].toString();
    const token_type = req.headers['x-access-token-type'];
    const { zone } = req.headers;

    if (!access_token || !token_type) return res.sendStatus(401);
    try {
      const userDetails: any = await verifyToken(access_token);

      if (userDetails && userDetails?.userId && userDetails?.email) {
        req.userId = userDetails.userId;
        req.email = userDetails.email;
        next();
      } else {
        return res.sendStatus(403);
      }
    } catch (error: any) {
      return res.sendStatus(401);
    }
  } else {
    res.status(401).send({ error: 'UnAuthorized Access' });
  }
};
