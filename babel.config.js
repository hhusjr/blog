module.exports = {
  presets: [
    '@quasar/babel-preset-app'
  ],
  'plugins': [
    ['prismjs', {
      'languages': ['javascript', 'css', 'markup', 'python'],
      'plugins': ['autoloader'],
      'css': true
    }]
  ]
}
