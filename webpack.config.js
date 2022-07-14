const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const mode = process.env.NODE_ENV || 'development'

module.exports = {
	mode,
	devtool: mode === 'development' ? 'eval' : false,
	entry: path.resolve(__dirname, 'src', 'index.jsx'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		filename: '[name][contenthash].js',
		assetModuleFilename: 'assets/[name].[hash][ext][query]',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	devServer: {
		port: 3000,
		open: true,
		hot: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public', 'index.html')
		}),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
	],
	module: {
		rules: [
			{
        test: /\.html$/i,
        loader: 'html-loader',
      },
			{
				test: /\.[tj]sx?$/i,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ["@babel/preset-react", "@babel/preset-env"],
					}
				}
			},
			{
				test: /\.(sa|sc|c)ss$/i,
				use: [
					MiniCssExtractPlugin.loader, 'css-loader', 
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [require('postcss-preset-env')],
							},
						},
					}, 
					'sass-loader',
				]
			},
			{
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
        type: 'asset/resource',
      },
      {
        test: /\.woff2?$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash][ext]',
        },
      },
		]
	}
}