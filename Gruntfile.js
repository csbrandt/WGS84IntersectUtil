module.exports = function(grunt) {
   // Load grunt tasks automatically
   require('load-grunt-tasks')(grunt);

   // Project configuration.
   grunt.initConfig({
      jshint: {
         options: {
            undef: true,
            curly: true,
            eqeqeq: true,
            eqnull: true,
            browser: true,
            shadow: true,
            jquery: true,
            couch: true,
            node: true,
            globals: {
               "define": false,
               "require": false
            }
         },
         all: ['./*.js', './lib/**/*.js']
      },
      jsbeautifier: {
         files: ['./*.js', './lib/**/*.js', './tools/**/*.js'],
         options: {
            //config: "path/to/configFile",
            html: {
               braceStyle: "expand",
               indentChar: " ",
               indentScripts: "keep",
               indentSize: 3,
               maxPreserveNewlines: 10,
               preserveNewlines: true,
               unformatted: ["a", "sub", "sup", "b", "i", "u"],
               wrapLineLength: 0
            },
            css: {
               indentChar: " ",
               indentSize: 3
            },
            js: {
               braceStyle: "collapse",
               breakChainedMethods: false,
               e4x: false,
               evalCode: false,
               indentChar: " ",
               indentLevel: 0,
               indentSize: 3,
               indentWithTabs: false,
               jslintHappy: false,
               keepArrayIndentation: true,
               keepFunctionIndentation: false,
               maxPreserveNewlines: 10,
               preserveNewlines: true,
               spaceBeforeConditional: true,
               spaceInParen: false,
               unescapeStrings: false,
               wrapLineLength: 0
            }
         }
      },
      coffee: {
         compile: {
            expand: true,
            flatten: true,
            cwd: './',
            src: ['test/**/*.coffee'],
            dest: 'test/',
            ext: '.js'

         }
      }
   });

   grunt.registerTask('default', ['jsbeautifier', 'jshint', 'coffee:compile']);

};
