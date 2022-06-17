module.exports = function(grunt) {

	grunt.loadNpmTasks('i18next-scanner');

	grunt.initConfig({
		i18next: {
			dev: {
				src: 'src/**/*.{js,jsx}',
					options: {
					func: {
						list: ['_t', 'i18n.t'],
						extensions: ['.js', '.jsx']
					},
					lngs: ['en'],
					resource: {
						loadPath: 'i18n/{{lng}}/{{ns}}.json',
						savePath: 'i18n/{{lng}}/{{ns}}.json'
					}
				}
			}
		}
	});

}