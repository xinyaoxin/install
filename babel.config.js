
module.exports = {
  "presets": ["@vue/app"],
  "plugins": [
    [
      "import",
      {
        "libraryName": "stdui",//组件库名称
        "camel2DashComponentName": false,//关闭驼峰自动转链式
        "camel2UnderlineComponentName": false,//关闭蛇形自动转链式
        "style": (name) => {
          const cssName = name.split('/')[2];
          console.log('***********name',cssName)
          return `stdui/lib/style/${cssName}.css`
        }
      }
    ],
  ]
}