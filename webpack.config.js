module.exports = {
    entry: './server.js',
    // Other Webpack configuration...
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
};