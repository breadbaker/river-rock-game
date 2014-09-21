'use strict';

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-shell');


    grunt.config.set('shell',{
        build: {                      // Target
            options: {                      // Options
                stderr: false
            },
            command: 'cordova build android'
        },
        emulate: {                      // Target
            options: {                      // Options
                stderr: false
            },
            command: 'cordova run android'
        },
        phone: {                      // Target
            options: {                      // Options
                stderr: false
            },
            command: 'scp -P 2222 platforms/android/ant-build/' + grunt.packageName + '-debug.apk root@192.168.1.4:/sdcard/Download/debug.apk'
        }
    });


};