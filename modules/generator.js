const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')

module.exports = function (metadata, src, dest) {
  if (!src) {
    return Promise.reject(new Error(`无效的source：${src}`))
  }
  
  return new Promise((resolve, reject) => {
    Metalsmith(process.cwd())
      .metadata(metadata)
      .clean(false)
      .source(src)
      .destination(dest)
      .use((files, metalsmith, done) => {
        const meta = metalsmith.metadata()
        Object.keys(files).forEach(fileName => {
          const fileNameArray = fileName.split('.')
          const disabledArray = ['vue', 'ico', 'png']
          if (!disabledArray.includes( fileNameArray[fileNameArray.length - 1])) {
            const t = files[fileName].contents.toString()
            files[fileName].contents = Buffer.from(Handlebars.compile(t)(meta))
          }
        })
        done()
      }).build(err => {
        err ? reject(err) : resolve()
      })
  })
}