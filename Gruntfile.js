module.exports = function(grunt) {
	
	grunt.initConfig({

	  htmlmin: {                                     // Task 
	    dist: {                                      // Target 
	      options: {                                 // Target options 
	        removeComments: true,
	        collapseWhitespace: true
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
	  }
	});

	/////////////////
	// Grunt Tasks //
	/////////////////

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	// Not implemented yet
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['htmlmin']);
	grunt.registerTask('build', ['clean', 'htmlmin']);
	grunt.registerTask('serve', ['connect', 'watch']);

};