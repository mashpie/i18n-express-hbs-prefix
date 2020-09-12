const path = require('path')

const express = require('express')
const handlebars = require('express-handlebars')
const i18n = require('i18n')
const inDev = process.env.NODE_ENV !== 'production'

const routes = require('./routes')

/**
 * configure translations
 */
i18n.configure({
  locales: ['en', 'nl'],
  defaultLocale: 'en',
  directory: path.resolve(__dirname, 'translations'),
  autoReload: inDev,
  updateFiles: inDev,
  syncFiles: inDev
})

/**
 * create express app
 */
const app = express()

/**
 * setup templating
 */
app.engine(
  'hbs',
  handlebars({
    defaultLayout: 'index',
    layoutsDir: path.resolve(__dirname, 'views', 'layouts'),
    partialsDir: path.resolve(__dirname, 'views', 'partials'),
    extname: 'hbs'
  })
)

app.set('view engine', 'hbs')

/**
 * initialize translations for each request
 * guessing browser language by it's header
 */
app.use(i18n.init)

/**
 * redirect to guessed language home page
 * -> /en will be default
 */
app.all('/', (req, res) => {
  res.redirect(`/${i18n.getLocale(req)}`)
})

/**
 * add routes with language prefix
 */
app.use('/:lang', routes)

/**
 * set language based on prefix path
 */
app.param('lang', (req, res, next, lang) => {
  i18n.setLocale(req, lang)
  next()
})

/**
 * publish current language for html attribute
 */
app.use((req, res, next) => {
  res.locals.lang = i18n.getLocale(req)
  next()
})

/**
 * startup
 */
app.listen(3000)
