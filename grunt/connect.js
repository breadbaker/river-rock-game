'use strict';

var path = require('path');

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.config.set('connect', {
      server: {
        options: {
          base: 'www',
          port: 8765,
          keepalive: true
        }
      }
    });
};
