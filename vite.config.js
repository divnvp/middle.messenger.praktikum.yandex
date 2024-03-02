import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
	plugins: [handlebars(), eslintPlugin()],
	build: {
		rollupOptions: {
			input: {
				app: './static/index.html'
			}
		}
	},
	server: {
		open: './static/index.html'
	}
});
