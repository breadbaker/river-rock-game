'use strict';

module.exports = function (grunt) {

    require('time-grunt')(grunt);

    grunt.packageName = 'RockStacker';

    grunt.file.expand('grunt/*.js').forEach(function (task) {
        require('./' + task)(grunt);
    });

    grunt.registerTask('default', [
        'clean',
        'concurrent:dev',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean',
        'concurrent:dev',
    ]);

    grunt.registerTask('phone', [
        'shell:build',
        'shell:phone',
        'notify:build'
    ]);

    grunt.registerTask('emulate', [
        'shell:build',
        'shell:emulate',
        'notify:build'
    ]);

};
