const gUtil = require('gulp-util')
const chalk = require('chalk')
const spawn = require('child_process').spawn;
const path = require('path')

module.exports = (gulp) => {
    gulp.task('client', function(callback) {

        const options = {
            cwd: path.resolve(path.join(__dirname, '../'))
        }

        const process = spawn('yarn', ['dev:client'], options)

        process.on('error', (err) => {
            gUtil.log(chalk.red('[client error]'), chalk.red(err.toString()))
        })

        process.stdout.on('data', (data) => {
            console.log(data.toString());
        })

        process.stderr.on('data', (data) => {
            console.log(chalk.red(data.toString()));
        })

        process.on('exit', function (code) {
            gUtil.log(chalk.cyan('[client]'), chalk.green(`exited with code: ${code.toString()}`));
        });

        callback()
    });
}