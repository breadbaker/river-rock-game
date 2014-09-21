'use strict';

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.config.set('watch.uglify', {
        files: [
            'src/scripts/vendor/**/*.js',
            '!**/*.min.js'
        ],
        tasks: [
            'uglify:vendor'
        ]
    });

    grunt.config.set('uglify', {
        options: {
            sourceMap: true,
            sourceMapIncludeSources: true
        },
        vendor: {
            files: {
                'www/scripts/vendor.min.js': [
                    'src/scripts/vendor/jquery.js',
                    'src/scripts/vendor/lodash.js',
                    'src/scripts/vendor/backbone.js',
                    'src/scripts/vendor/**/*.js',
                    '!**/*.min.js'
                ]
            }
        }
    });

    return grunt;
};
