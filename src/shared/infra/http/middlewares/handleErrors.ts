import { Request, Response } from 'express'
import AppError from '@shared/errors/AppError'

function handleErrors (error: Error, request: Request, response: Response) {
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
      message: 'Internal Servert Error'
    })
}

export default handleErrors
