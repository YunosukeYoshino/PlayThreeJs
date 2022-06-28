const { resolve } = require('path')

const root = 'src'
module.exports = {
  root: root,
  publicDir: 'public',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, root, 'index.html'),
        privacy: resolve(__dirname, root, 'privacy/index.html'),


      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      }
    }
  }
}
