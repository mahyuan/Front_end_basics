# webpack

[webpack](https://webpack.js.org)

## entry
```js
module.exports = {
    entry: 'index.js'

}

module.exports = {
    entry: ['index.js', 'vender.js']
}

module.exports = {
    entry: {
        index: 'index.js',
        vender: 'vender.js'
    }
}
```

## output 
```js
module.exports = {
    entry: 'index.js',
    output: {
        filename: 'index.min.js'
    }
}

module.exports = {
    entry: {
        index: 'index.js',
        vender: 'vender.js'
    },
    output: {
        filename: '[name].min.[hash:5].js'  // 自定义规则
    },
}
```

## loaders
常用的loader: 
- 编译相关
    - bable-loader, ts-loader, html-loader
- 样式相关
    - style-loader, css-loader, less-loader, postcss-loader
- 文件相关
    - file-loader, url-loader, svg-url-loader
```js
module.exports = {
    module: {
        reles: [
            {
                test: /\.css$/,
                loader: 'css-loader'
            },{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },{
                test: /\.html$/,
                exclude: /node_modules/,
                loader: "html-loader"
            }, {
                test: /\.(jpg|png)$/,
                exclude: /node_modules/,
                loader: "url-loader?limit=11000"
            }, {
                test: /\.svg$/,
                exclude: /node_modules/, 
                loader: 'svg-url-loader?limit=10000'
            }
        ]
    }
}
```

## plugins
打包优化和压缩、配置编译时的变量等。
常用的plugins:
- 优化相关
    - CommonsChunkPlugin
    - UglifyjsWebpackPlugin
- 功能相关
    - ExtractTextWebpackPlugin
    - HtmlWebpackPlugin
    - HotModuleReplacementPlugin
    - CopyWebpackPlugin
```js
module.exports = {
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
}
```

## 名词
- Chunk: 代码块
- Bundle: 打包，一束一捆
- Module: 模块

## 打包 JS
```sh
webpack entry<enter> output
# 或者
webpack --config webpack.config.js
```


