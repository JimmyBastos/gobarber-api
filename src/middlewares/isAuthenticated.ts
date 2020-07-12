import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import authConfig from '../config/auth'
import AppError from '../errors/AppError'

interface TokenPayload {
  iat: string
  exp: string
  sub: string
}

function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT token is missing.', 401)
  }

  try {
    const [, token] = authHeader.split(' ')

    const decodedToken = verify(token, authConfig.jwt.secret)

    const { sub } = decodedToken as TokenPayload

    request.user = { id: sub }

    next()
  } catch (error) {
    throw new AppError('Invalid JWT token.', 401)
  }
}

export default isAuthenticated
