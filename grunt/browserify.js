'use strict';

var _ = require('lodash');

module.exports = function (grunt) {
    var scripts = grunt.config.get('scripts');

    grunt.loadNpmTasks('grunt-browserify');

    grunt.config.set('browserify', {

        options: {
            debug: true,

            aliasMappings: [{
                expand: true,
                cwd: 'src/scripts/views',
                src: ['**/*.js'],
                dest: 'views/'
            },{
                expand: true,
                cwd: 'src/data',
                src: ['**/*.js'],
                dest: 'data/'
            },{
                expand: true,
                cwd: 'src/scripts/famous',
                src: ['**/*.js'],
                dest: 'famous/'
            }]
        },
    });

    grunt.config.set('browserify.app', {

        files: [{
            dest: 'www/scripts/app.min.js',
            src: [
                'src/scripts/main.js',
                '!src/scripts/vendor/**/*.js'
            ],
        }],
    });

    grunt.config.set('watch.browserify-app', {
        files: [
            'src/data/config-options.js',
            'src/scripts/**/*.js',
            '!src/scripts/vendor/**/*.js'
        ],
        tasks: [
            'browserify:app',
            'notify:build'
        ],
        options: {
            debug: true
        }
    });

    return grunt;
};
