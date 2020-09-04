import { Request, Response, NextFunction } from 'express'
import AppError from '@shared/errors/AppError'

function handleErrors (error: Error, request: Request, response: Response, _next: NextFunction) {
  if (error instanceof AppError) {
    return response
      .status(error.statusCode)
      .json({
        status: 'error',
        message: error.message
      })
  }

  console.error(error)

  return response
    .status(500)
    .json({
      status: 'error',
      message: 'Internal Server Error'
    })
}

export default handleErrors
