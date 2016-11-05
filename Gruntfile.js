module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      build: {
        expand: true,
        src: ['app/**/*.js', './config/*.js', './index.js', './bin/www'],
        dest: './build'
        // ext: '.js'
      }
    },
    eslint: {
      options: {
        format: 'node_modules/eslint-json',
        outputFile: `${__dirname}/logs/eslint/${'<%= pkg.name %>'}-checkstyle.json`,
        // configFile: 'config/eslint.json',
        // rulePaths: ['config/rules']
      },
      build: ['**/*.js', 'bin/www', '!node_modules/**']
    },
    nodemon: {
      dev: {
        script: '<%= pkg.scripts.dev %>',
        options: {
          callback: function(nodemon) {
            nodemon.on('log', function(event) {
              console.log(event.colour + '\n\t' + event.message);
            });
          },
          env: {
            PORT: '1334'
          },
          cwd: __dirname,
          ignore: ['node_modules/**'],
          ext: '.js',
          watch: [__dirname]
        }
      }
    },
    clean: {
      build: ['build/']
    },
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    watch: {
      scripts: {
        files: ['<%= babel.build.src %>'],
        tasks: ['babel']
      }
    }
  });

  // Grunt plugins.
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-concurrent');

  // Grunt Tasks.
  grunt.registerTask('default', ['clean', 'babel', 'nodemon']);
  grunt.registerTask('serve-dev', ['clean', 'babel', 'concurrent:dev']);
  grunt.registerTask('build', ['babel', 'eslint']);
  grunt.registerTask('lint', ['eslint']);
};