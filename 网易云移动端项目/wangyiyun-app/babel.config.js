module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  //引入vant
  "plugins": [
    [
      "import",
      {
        "libraryName": "vant",
        "libraryDirectory": "es",
        "style": true
      }
    ]
  ]
}
