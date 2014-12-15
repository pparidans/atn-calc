// Gruntfile
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            options: {
                transform: [ 'reactify' ]
            },
            production: {
                files: {
                    'dist/public/assets/bundle.js': 'src/app/app.jsx'
                },
                options: {
                    plugin: [ 'minifyify']
                }
            },
            development: {
                files: {
                    'dist/public/assets/bundle.js': 'src/app/app.jsx'
                }
            }
        },
        copy: {
            public: {
                expand: true,
                cwd: 'src/public',
                src: '**',
                dest: 'dist/public/'
            },
            fonts: {
                expand: true,
                cwd: 'node_modules/bootstrap/fonts',
                src: '**',
                dest: 'dist/public/assets/fonts/'
            }
        },
        less: {
            options: {
                paths: ['assets/']
            },
            production: {
                options: {
                    cleancss: true
                },
                files: {
                    'dist/public/assets/styles.css': 'src/app/less/main.less'
                }
            },
            development: {
                files: {
                    'dist/public/assets/styles.css': 'src/app/less/main.less'
                }
            }
        }
    });
 
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
 
    grunt.registerTask('production', ['browserify:production', 'less:production', 'copy']);
    grunt.registerTask('development', ['browserify:development', 'less:development', 'copy']);
    grunt.registerTask('default', 'production');
};