module.exports = function(grunt) {
	
	grunt.initConfig({
		buildcontrol: {
	    options: {
	      dir: 'dist',
	      commit: true,
	      push: true,
	      message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
	    },
	    pages: {
	      options: {
	        remote: 'https://github.com/diegovargasg/rundiegorun.git',
	        branch: 'gh-pages'
	      }
	    }
    },
	  htmlmin: {                                     // Task 
	    dist: {                                      // Target 
	      options: {                                 // Target options 
	        removeComments: false,
	        collapseWhitespace: false
	      },
	      files: {                                   // Dictionary of files 
	        'dist/index.html': 'app/index.html',     // 'destination': 'source' 
	      }
	    }
	  },
	  clean: {
		  build: ["dist/"],
		},
		watch: {
	    livereload: {
        options: {livereload: true},
        files: ['app/index.html', 'app/css/*.css', 'app/js/*.js', 'assets/tilemaps/*.json'],
      },
	  },
	  connect: {
	    server: {
	      options: {
	        port: 9000,
	        livereload: true,
	        middleware: function(connect) {
            return [
              connect.static('app'),
              connect().use('/bower_components', connect.static('./bower_components'))
            ];
          }
	      }
	    }
	  },
	  imagemin: {
	  	dist: {
		    files: [{
		        expand: true,
		        cwd: 'app/assets/images',
		        src: '{,*/}*.{png,jpg,jpeg}',
		        dest: 'dist/assets/images'
		    }]
	    }	
	  },
	  jshint: {
	    all: ['app/js/*.js']
	  },
	  sprite:{
      all: {
        src: 'app/assets/png/*.png',
        dest: 'app/assets/png/spritesheet.png',
        destCss: 'app/assets/png/sprites.css',
        cssTemplate: 'app/assets/png/handlebarsStr.css.handlebars'
      }
    },
    cmq: {
	    options: {
	      log: false
	    },
	    your_target: {
	      files: {
	        'dist/css/': ['app/css/*.css']
	      }
	    }
  	},
  	cssmin: {
		  dist: {
        files: {
          'dist/css/main.min.css': [
            'app/css/*.css'
          ]
        }
      }
		},
	  requirejs: {
		  compile: {
		    options: {
          baseUrl: "app/js",
          out: 'dist/js/main.js',
          mainConfigFile: "app/js/main.js",
          name: '../../bower_components/almond/almond',
          include: 'main',
          // optimize: 'none'
		    }
		  }
		}
	});

	/////////////////
	// Grunt Tasks //
	/////////////////

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-build-control');
	grunt.loadNpmTasks('grunt-spritesmith');
	grunt.loadNpmTasks('grunt-combine-media-queries');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Not implemented yet
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-uncss');

	grunt.registerTask('default', ['htmlmin']);
	grunt.registerTask('build', ['clean', 'htmlmin', 'imagemin', 'requirejs']);
	grunt.registerTask('serve', ['connect', 'watch']);

};