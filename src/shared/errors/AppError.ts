class AppError {
  constructor (
    public readonly messate: string,
    public readonly statusCode: number = 400
  ) { }
}

export default AppError
