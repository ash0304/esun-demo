module.exports = {
    publicPath: process.env.VUE_APP_ENV === 'dev' || process.env.VUE_APP_ENV === 'local' ? '/' : '/DIMSWEB'
}