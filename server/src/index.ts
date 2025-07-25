import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import * as dynamoose from 'dynamoose'
import serverless from 'serverless-http'
import { clerkMiddleware, createClerkClient, requireAuth } from '@clerk/express'

/* ROUTE IMPORTS */
import courseRoutes from './routes/courseRoutes'
import userClerkRoutes from './routes/userClerkRoutes'
import transactionRoutes from './routes/transactionRoutes'
import userCourseProgressRoutes from './routes/userCourseProgressRoutes'
import seed from './seed/seedDynamodb'

/* CONFIGURATIONS */
dotenv.config()

const isProduction = process.env.NODE_ENV === 'production'

if (!isProduction) {
  dynamoose.aws.ddb.local()
}

export const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
})

const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(clerkMiddleware())

/* ROUTES */

app.get('/', (req, res) => {
  res.send('Welcome to the server!')
})

app.use('/courses', courseRoutes)
app.use('/users/clerk', requireAuth(), userClerkRoutes)
app.use('/transactions', requireAuth(), transactionRoutes)
app.use('/users/course-progress', requireAuth(), userCourseProgressRoutes)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

/* Server */
const PORT = process.env.PORT || 3000
if (!isProduction) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}

// aws production environment
const serverlessApp = serverless(app)

export const handler = async (event: any, context: any) => {
  if (event.action === 'seed') {
    await seed()
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Database seeded successfully' }),
    }
  } else {
    return serverlessApp(event, context)
  }
}
