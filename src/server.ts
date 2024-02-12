/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config'

// unhandled exception



// SIGTERM handler
let server: Server

const dbConnect = async () => {
  try {
    await mongoose.connect(config.database_url as string)

    server = app.listen(config.port, () => {
      config.env !== 'production'
         console.log(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    config.env !== 'production'
       console.log(error)
  }
  process.on('unhandledRejection', err => {
    console.log('unhandled rejection occur close the srver')
    if (server) {
      server.close(() => {
        console.log(err)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

dbConnect()
