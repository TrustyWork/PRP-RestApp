const path = require('path')
	, webpack = require('webpack')
	, fs = require('fs')

const HtmlWebpackPlugin = require('html-webpack-plugin') //Создает html файл для точки входа
	, PreloadWebpackPlugin = require('preload-webpack-plugin') //Делает прелоад файлов
	, SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin') //ServiceWorker, на замену устаревшему appcache
	, FaviconsWebpackPlugin = require('favicons-webpack-plugin') //генерирует favicon в различных форматах. Формирует долго потому включено только для продакшена

//Настройка логов
const stats = {
	assets: true
	, children: false
	, chunks: false
	, hash: false
	, modules: false
	, publicPath: false
	, timings: true
	, version: false
	, warnings: true
	, colors: {
		green: '\u001b[32m'
	}
};

module.exports = function (env) {

	const nodeEnv = process.env.NODE_ENV || 'production'
		, isProd = nodeEnv == 'production' //Если NODE_ENV не задан, то работаем в 'development', на реальном сервере надо указать 'production'
		, isDevServ = env.dev_serv == 'true'
		, isServiceWorkerBuild = env && env.sw == 'true';

	//Опции
	const buildPath = env.output_dir ? path.resolve(__dirname, env.output_dir) : path.resolve(__dirname, './build') //Куда собирать
		, sourcePath = path.join(__dirname, './src')
		, host = env.host || 'localhost' //хост для WebpackDevServer
		, port = env.port || 3000 //порт для WebpackDevServer
		, proxyHost = env.proxy_host || 'localhost' //хост для WebpackDevServer
		, proxyPort = env.proxy_port || 4000

		, integrationToExist = false //true если нужны только js файлы для интеграции в существующий проект
		, watch = (env && env.watch == 'true') ? true : false;

	let cssLoader = [
		{
			loader: 'style-loader'
		}, {
			loader: 'css-loader'
			, options: {
				module: false
				, localIdentName: '[path][name]-[local]'
				, sourceMap: !isProd
			}
		}, {
			loader: 'postcss-loader'
			, options: {
				sourceMap: !isProd
				, browsers: [
					'last 3 version'
					, 'ie >= 10'
				]
			}
		}, {
			loader: 'sass-loader'
			, options: {
				outputStyle: isProd ? 'compressed' : 'expanded'
				, sourceMap: !isProd
				, includePaths: [sourcePath]
			}
		}
	];

	let cssLoaderModules = JSON.parse(JSON.stringify(cssLoader)); //clone array (create new array)
	cssLoaderModules[1].options.module = true;

	const plugins = [
		new webpack.optimize.CommonsChunkPlugin({ //создание файла с общим для всех JS модулей кодом
			name: 'common' //имя файла
			, async: true //Подгружать асинхронно
			, children: true //Учитывать дочерние модули
			, minChunks: 2 //В склдбки точках входа должен повториться
		}), new webpack.DefinePlugin({ //добавить глобальные переменные для модулей проекта
			'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
		}), new PreloadWebpackPlugin({ //прелоад чанков
			rel: 'prefetch'
		}), new webpack.NoEmitOnErrorsPlugin() //чтобы не пересобирало при ощибке
	];

	if (!integrationToExist) {
		plugins.push(new HtmlWebpackPlugin({ //Вырубить если интегрируем куда-то не в front-end среду
			template: path.resolve(sourcePath, './index.html')
			, inject: true
			, production: isProd
			, minify: isProd && {
				removeComments: true
				, collapseWhitespace: true
				, removeRedundantAttributes: true
				, useShortDoctype: true
				, removeEmptyAttributes: true
				, removeStyleLinkTypeAttributes: true
				, keepClosingSlash: true
				, minifyJS: true
				, minifyCSS: true
				, minifyURLs: true
			}
		}));
	}

	if (isProd) {

		//Bug: UglifyJSPlugin is crached. Using standart webpack Uglify plugin
		plugins.push(new webpack.optimize.UglifyJsPlugin({
			sourceMap: false
			, mangle: false
			, compress: {
				warnings: false
				, screw_ie8: true
				, conditionals: true
				, unused: true
				, comparisons: true
				, sequences: true
				, dead_code: true
				, evaluate: true
				, if_return: true
				, join_vars: true
			}
		}));
		let faviconPath = path.resolve(sourcePath, './favicon.png');
		if (!integrationToExist && fs.existsSync(faviconPath)) {
			plugins.push(new FaviconsWebpackPlugin({
				prefix: 'assets/favicon/', logo: 'favicon.png'
			}));
		}

	} else { // !isProd

		plugins.push(
			new webpack.NamedModulesPlugin() //Имена модулей в логах вместо номеров
		);
	}

	if (isDevServ) {
		plugins.push(
			new webpack.HotModuleReplacementPlugin() //Для работы функции Hot в WebpackSevServer
		);
	}

	if (isServiceWorkerBuild) { //TODO: Проверить, что-то нето генерируцет в путях к файлам
		plugins.push(
			new SWPrecacheWebpackPlugin({
				cacheId: 'app'
				, entry: path.join(sourcePath, './sw.js')
				, filename: './sw.js'
				, maximumFileSizeToCacheInBytes: 1024 * 800 //В байтах
				, mergeStaticsConfig: true
				, minify: true
				, runtimeCaching: [{
					handler: 'cacheFirst'
					, urlPattern: /(.*?)/
				}]
			})
		);
	}

	const entryPoint = [
		'./app'
	]

	if (isDevServ) {
		entryPoint.unshift(
			'react-hot-loader/patch' //Hot Module Replace для React
			, `webpack-dev-server/client?http://${host}:${port}`
			, 'webpack/hot/only-dev-server' //базовый HMR
		)
	}

	return {
		devtool: !isProd ? 'cheap-module-source-map' : false //создавать соурсмапы в модулях вебпака, для продакшена создавать не надо
		, context: sourcePath
		, entry: {
			main: entryPoint
		}, output: {
			path: buildPath
			, publicPath: '/'
			, filename: '[name].js'
			, chunkFilename: '[name]-[chunkhash:8].js',
		}, module: {
			rules: [
				{
					test: /\.(eot|svg|ttf|woff2?)$/    //   /\.(html|svg|ttf|woff2?)$/
					//, exclude: /node_modules/
					, use: {
						loader: 'file-loader'
						, options: {
							name: 'static/[name]-[hash:8].[ext]'
						}
					}
				}, {
					test: /\.(scss|sass|css)$/
					, exclude: /node_modules/
					, use: cssLoaderModules,
				}, {
					test: /\.(scss|sass|css)$/
					, include: /node_modules/
					, use: cssLoader,
				}, {
					test: /\.jsx?$/,
					exclude: [/node_modules/],
					use: 'babel-loader'
				}, {
					test: /\.html$/
					, use: [{
						loader: 'html-loader'
						, options: {
							attrs: ['img:src', 'link:href']
							, modules: true
						}
					}]
				}, {
					test: /\.(png|jpg|jpeg|gif|tiff|webp|ico)$/
					, exclude: /node_modules/
					, use: [{
						loader: 'url-loader'
						, options: {
							limit: 1024 * 10
							, name: 'assets/[hash:6]/[hash].[ext]' //хеши чтобы избежать дубликатов, а [hash:6] чтобы небыло тормозов fs от большого количества файлов
						}
					}]
				}
			]
		}, resolve: { //Где искать модули
			extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'] //Возможные расширения модулей
			, modules: [
				path.resolve(__dirname, 'node_modules')
				, sourcePath //аналог NODE_PATH=.
			]
		}, target: 'web' //Вебпак по умолчаниюю собирает модули для использования в браухзере, но могут быть варианты, например собрать под Electron
		, plugins
		, performance: isProd && { //Предупреждать о больших файлах
			maxAssetSize: 1024 * 200 //в байтах
			, maxEntrypointSize: 1024 * 400 //в байтах
			, hints: 'warning'
		}, stats: stats
		, watch: watch
		, devServer: {
			contentBase: sourcePath
			, publicPath: '/'
			, historyApiFallback: false //пересылать 404 назад на index.html, это нужно для сайтов использующих html5 history API
			, port: port
			, host: host
			, hot: !isProd
			, compress: isProd
			, stats: stats
			, noInfo: true // только ошибки и варнинги
			, proxy: { // Прокси для пересылки запросов на бек
				'/socket.io/*': {
					target: `http://${proxyHost}:${proxyPort}`,
					ws: true,
				},
				'*': `http://${proxyHost}:${proxyPort}` //Все чего нет в src, пересылай на бек сервер
			}
		}
	}
}