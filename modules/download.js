const download = require('download-git-repo')

module.exports = async function (path) {
  return new Promise((resolve, reject) => {
    download('blogwy/cli-demo-template#master', path, function (err) {
      err ? reject('Error') : resolve('Success')
    })
  })
}