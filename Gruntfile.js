module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify:{
			options:{
				compress:true
			},
			reduce_one: {
				src: 'src/js/index.js',
				dest: 'tmp/js/index.js'
			},
		},
		uncss: {
			options:{
				ignore: ['.badge', '.badge-info', '.badge-warning', '.btn-danger']
			},
			reduce_one: {
				files: {
					'tmp/css/style_uncss.css': ['src/ClientWebSocketTester.html']
				}
			}
		},
		copy:{
			reduce_one:{
				expand: true,
				cwd: 'src/',
				src: ['ClientWebSocketTester.html'],
				dest: 'tmp/'
			}
		},
		cssmin:{
			options:{
				level: {
					1: {
						specialComments: 0
					}
				}
			},
			reduce_two: {
				files: {
					'tmp/css/style.css': ['tmp/css/style_uncss.css']
				}
			}
		},
		processhtml:{
			options: {

			},
			reduce_three: {
				files: {
					'tmp/ClientWebSocketTester.html' : ['tmp/ClientWebSocketTester.html']
				}
			}
		},
		htmlmin:{
			options:{
				removeComments: true,
				collapseWhitespace: true
			},
			build: {
				files: {
					'build/ClientWebSocketTester.html' : 'tmp/ClientWebSocketTester.html'
				}
			}
		}
	});

	// Load modules
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.file.mkdir('tmp');
	grunt.file.mkdir('build');
	grunt.registerTask('default', ['uglify', 'uncss', 'copy', 'cssmin', 'processhtml', 'htmlmin']);
}
