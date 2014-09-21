'use strict';

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.config.set('concurrent', {
        dev: {
            tasks: [
                'uglify',
                'browserify',
                'copy',
                'watch',
                'connect'
            ]
        }
    });

    return grunt;
};
