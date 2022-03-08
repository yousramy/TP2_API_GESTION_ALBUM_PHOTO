// Dependencies
const express = require('express')

// Dependencies middleware
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')

// Core
const config = require('./config.js')
const routes = require('./controllers/routes.js')

/**
 * Server
 */
module.exports = class Server {
  constructor () {
    this.app = express()
    this.config = config[process.argv[2]] || config.development
  }

  /**
   * Middleware
   */
  middleware () {
    this.app.use(compression())
    this.app.use(cors())
    this.app.use(bodyParser.urlencoded({ 'extended': true }))
    this.app.use(bodyParser.json())
  }

  /**
   * Routes
   */
  routes () {
    new routes.users.Show(this.app, this.config)
    new routes.users.Update(this.app, this.config)
    new routes.users.Create(this.app, this.config)
    new routes.users.Delete(this.app, this.config)

    // If route not exist
    this.app.use((req, res) => {
      res.status(404).json({
        'code': 404,
        'message': 'Not Found'
      })
    })
  }

  /**
   * Security
   */
  security () {
    this.app.use(helmet())
    this.app.disable('x-powered-by')
  }

  /**
   * Run
   */
  run () {
    try {
      this.security()
      this.middleware()
      this.routes()
      this.app.listen(3000)
    } catch (err) {
      console.error(`[ERROR] Server -> ${err}`)
    }
  }
}
