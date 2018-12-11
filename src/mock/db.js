const Mock = require('mockjs')

module.exports = () => {
  return {
    'message': Array.from({length:30}).map((e,i) => {
      return Mock.mock({
        'user|+1': i,
        'content': Mock.Random.title()
      })
    })
  }
}