'use strict';

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.config.set('watch.copy-index', {
        files: ['src/*.html', 'src/server/**/*.js' ],
        tasks: ['copy']
    });

    grunt.config.set('copy', {
        model: {
            files: [
                {expand: true, cwd: 'src/server', src: ['**/*.js'], dest: 'www'},
                {expand: true, cwd: 'src/', src: ['*.html', '**/*.png', '**/*.jpg'], dest: 'www'},
                {expand: true, cwd: 'src/data/', src: ['*.js'], dest: 'www/data'}
              ]
          }
      });

    return grunt;
};
