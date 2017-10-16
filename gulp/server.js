
const nodemon = require('gulp-nodemon');

module.exports = (gulp) => {
    gulp.task('server', () => {
        nodemon({
            script: 'server/index.js',
            ext: 'js html yaml',
            env: { 'NODE_ENV': 'development' },
            exclude: 'client',
            verbose: true,
            nodeArgs: ['--debug']
        })
    })
}