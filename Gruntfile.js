module.exports = function(grunt) {
    // 配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            // If any .less file changes in directory "build/less/" run the "less"-task.
            files: [
                "src/css/*.css",
                "src/js/*.js",
                "src/js/*/*.js",
                "src/js/*/*/*.js"
            ],
            tasks: ["jslint","css"]
        },
        concat: {
            domop: {
                src: [
                    "src/js/*.js",
                    "src/js/*/*.js",
                    "src/js/*/*/*.js"
                ],
                dest: 'dist/js/dist.js'
            },
            css: {
                src: [
                    "src/css/*.css"
                ],
                dest: 'dist/css/dist.css'
            },
            vendor:{
                src: [
                    'assets/css/bootstrap.min.css',
                    'assets/css/font-awesome.min.css',
                    'assets/css/colorbox.css',
                    'assets/css/datepicker.css',
                    'assets/css/ace.min.css',
                    'assets/css/ace-rtl.min.css',
                    'assets/css/ace-skins.min.css',
                    'bower_components/jstree/jstree.min.css'
                ],
                dest: 'dist/assets/css/vendor.css'
            }
        },
        clean: {
            tests: ['dist/css/*.css']
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'dist/js/dist.js',
                dest: 'dist/js/dist.min.js'
            },
            release: {
                files: {
                    'dist/js/vendor.min.js': [
                        'assets/js/ace-extra.min.js',
                        'assets/js/jquery-2.0.3.min.js',
                        'assets/js/bootstrap.min.js',
                        'assets/js/typeahead-bs2.min.js',
                        'assets/js/bootbox.min.js',
                        'assets/js/jquery.slimscroll.min.js',
                        'assets/js/jquery.easy-pie-chart.min.js',
                        'assets/js/jquery.sparkline.min.js',
                        'assets/js/flot/jquery.flot.min.js',
                        'assets/js/flot/jquery.flot.pie.min.js',
                        'assets/js/flot/jquery.flot.resize.min.js',
                        'assets/js/jquery.validate.min.js',
                        'bower_components/jquery/jquery.twbsPagination.js',
                        'bower_components/bootstrap/js/bootstrap-datepicker-cn.min.js',
                        'bower_components/angular/angular.min.js',
                        'bower_components/angular/angular-sanitize.min.js',
                        'bower_components/angular/angular-resource.min.js',
                        'bower_components/angular/angular-ui-router.js',
                        'assets/js/jquery.colorbox-min.js',
                        'assets/js/ace-elements.min.js',
                        'assets/js/ace.min.js',
                        'bower_components/jstree/jstree.min.js'
                    ],
                }
            }
        },
        cssmin: {
            css: {
                src: ['dist/css/dist.css'],
                dest: 'dist/css/dist.min.css'
            },
            compress: {
                src: ['dist/assets/css/vendor.css'],
                dest: 'dist/assets/css/vendor.min.css'
            }
        },
        imagemin: {                          // Task
            dynamic: {                         // Another target
                options: {                       // Target options
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'assets/avatars/',                   // Src matches are relative to this path
                    src: ['*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'dist/assets/avatars/'                  // Destination path prefix
                },{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'assets/css/images/',                   // Src matches are relative to this path
                    src: ['*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'dist/assets/css/images/'                  // Destination path prefix
                },{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'assets/images/gallery/',                   // Src matches are relative to this path
                    src: ['*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'dist/assets/images/gallery/'                  // Destination path prefix
                }]
            }
        },
        jshint: {
            options: {
                //大括号包裹
                curly: true,
                //对于简单类型，使用===和!==，而不是==和!=
                eqeqeq: true,
                //对于首字母大写的函数（声明的类），强制使用new
                newcap: true,
                //禁用arguments.caller和arguments.callee
                noarg: true,
                //对于属性使用aaa.bbb而不是aaa['bbb']
                sub: true,
                //查找所有未定义变量
                undef: true,
                //查找类似与if(a = 0)这样的代码
                boss: true,
                //指定运行环境为node.js
                node: true
            },
            //具体任务配置
            files: {
                src: ["src/js/*.js",
                    "src/js/*/*.js",
                    "src/js/*/*/*.js"]
            }
        }
    });
    // 载入concat和uglify插件，分别对于合并和压缩
    // 加载指定插件任务
    grunt.loadNpmTasks('grunt-contrib-jshint');  //js校验
    grunt.loadNpmTasks('grunt-contrib-concat'); //合并文件
    grunt.loadNpmTasks('grunt-contrib-uglify');  //合并压缩js文件
    grunt.loadNpmTasks('grunt-contrib-clean');    //清除文件
    // Watch File Changes
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');  //压缩img
    grunt.loadNpmTasks('grunt-css');      //压缩css
    //grunt.loadNpmTasks('grunt-csscomb');    //优化css结构
    // 注册任务
    //合并压缩src下面的js
    grunt.registerTask('jslint', ['concat:domop', 'uglify:build']);
    //合并压缩src下面的css
    grunt.registerTask('css', ['clean', 'concat:css', 'cssmin:css']);
    //合并压缩其他css
    grunt.registerTask('cssvendor', ['concat:vendor','cssmin:compress']);
    //合并压缩image
    grunt.registerTask('image', ['imagemin']);
    //合并压缩第三方js库
    grunt.registerTask('release', ['uglify:release']);
    // js校验
    grunt.registerTask('jshint', ['jshint']);

    
    grunt.registerTask('default', ['watch']);
};
