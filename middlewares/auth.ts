import { Request, Response, NextFunction } from "express"
import User from '../models/user'

interface AuthRequest extends Request {
  user?: any
}

export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  if(req.headers.authorization) {
    const token: string = req.headers.authorization.split(' ')[1]
    const user = await User.findOne({ token: token, deleted: false })
    if(user) req["user"] = user
  }
  next()
}