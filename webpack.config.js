var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AutoPreFixer = require('autoprefixer');

//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TARGET = process.env.npm_lifecycle_event;

//环境
var webpackConfig = {
    node: {
        net: 'empty',
        dns: 'empty'
    },
    //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
    entry: {
        app: path.resolve(APP_PATH, 'index.js'),
        //添加要打包在libs里面的库
        libs: ['immutable', 'classnames', 'lodash', 'react', 'react-dom', 'react-router', 'react-redux', 'redux', 'redux-thunk']
    },
    //输出的文件名 合并以后的js会命名为bundle.js
    output: {
        path: BUILD_PATH,
        publicPath: '/',
        filename: 'bundle.[hash].js'
    },
    module: {
        loaders: [
            {
                test: /\.(le|c)ss$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file?hash=sha512&digest=hex&name=imgs/[hash].[ext]'
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff&prefix=fonts&name=fonts/[hash].[ext]'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream&prefix=fonts&name=fonts/[hash].[ext]'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/vnd.ms-fontobject&prefix=fonts&name=fonts/[hash].[ext]'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml&prefix=fonts&name=fonts/[hash].[ext]'
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel',
                include: APP_PATH,
                exclude: [
                    path.resolve(ROOT_PATH, 'node_modules')
                ]
            }
        ]
    },
    postcss: [AutoPreFixer()],
    resolve: {
        root: path.resolve(APP_PATH),
        extensions: ['', '.js', '.jsx']
    }
};

var env = TARGET == 'build' ? 'production' : 'development';

var plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(env)
        }
    }),
    new ExtractTextPlugin('style.[hash].css', {
        allChunks: true
    }),
    new webpack.ProvidePlugin({
        _: 'lodash',
        lodash: 'lodash',
        debug: 'debug'
    }),
    //配置模板文件
    new HtmlWebpackPlugin({
        template: './templates/index.tpl'
    }),
    new webpack.optimize.CommonsChunkPlugin('libs', 'libs.[hash].js')
];

//用环境去改变配置
if (TARGET == 'build') {
    webpackConfig.module.loaders.push({
        test: /\.jsx?$/,
        loader: 'strip-loader?strip[]=log,strip[]=console.log',
        exclude: [
            path.resolve(ROOT_PATH, 'node_modules')
        ]
    });

    Array.prototype.push.apply(plugins, [

        new CleanPlugin([BUILD_PATH]),

        // 这个插件用来寻找相同的包和文件，并把它们合并在一起
        new webpack.optimize.DedupePlugin(),

        // 这个插件根据包/库的引用次数来优化它们
        new webpack.optimize.OccurenceOrderPlugin(),

        // 这个插件用来阻止Webpack把过小的文件打成单独的包
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 51200 // ~50kb
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]);
} else {
    webpackConfig.devServer = {port: 9999};
    webpackConfig.module.preLoaders = [{test: /\.jsx?$/, loader: 'eslint'}];
    webpackConfig.devtool = '#eval-source-map';
}

webpackConfig.plugins = plugins;
module.exports = webpackConfig;
