import { Request, Response, NextFunction } from 'express'
import AppError from '../errors/AppError'

function handleErrors(error: Error, request: Request, response: Response, next: NextFunction) {
  if (error instanceof AppError) {
    return response
      .status(error.statusCode)
      .json({
        status: 'error',
        messate: error.message
      })
  }

  console.error(error)

  return response
    .status(500)
    .json({
      status: 'error',
      messate: 'Internal Servert Error'
    })
}

export default handleErrors
