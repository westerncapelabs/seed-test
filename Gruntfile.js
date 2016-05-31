module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        paths: {
            src: {
                app: [
                    'src/index.js',
                    'src/init.js',
                    'src/app.js'
                ]
            },
            dest: {
                app: 'go-app.js'
            },
            test: {
                app: [
                    'test/setup.js',
                    'src/app.js',
                    'test/app.test.js'
                ]
            },
            all: [
                'src/**/*.js'
            ]
        },

        jshint: {
            options: {jshintrc: '.jshintrc'},
            all: [
                'Gruntfile.js',
                'src/index.js',
                'src/init.js',
                'src/app.js'
            ]
        },

        watch: {
            src: {
                files: [
                    '<%= paths.src.all %>'
                ],
                tasks: ['default'],
                options: {
                    atBegin: true
                }
            }
        },

        concat: {
            options: {
                banner: [
                    '// WARNING: This is a generated file.',
                    '//          If you edit it you will be sad.',
                    '//          Edit src/app.js instead.',
                    '\n' // Newline between banner and content.
                ].join('\n')
            },
            app: {
                src: ['<%= paths.src.app %>'],
                dest: '<%= paths.dest.app %>'
            }
        },

        mochaTest: {
            options: {
                reporter: 'spec'
            },
            test_app: {
                src: ['<%= paths.test.app %>']
            }
        }
    });

    grunt.registerTask('test', [
        'jshint',
        'build',
        'mochaTest'
    ]);

    grunt.registerTask('build', [
        'concat'
    ]);

    grunt.registerTask('default', [
        'build',
        'test'
    ]);
};
