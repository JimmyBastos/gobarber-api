const authConfig = {
  jwt: {
    secret: process.env.APP_SECRET as string
  }
}

export default authConfig
