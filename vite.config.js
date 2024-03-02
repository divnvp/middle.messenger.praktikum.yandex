import {defineConfig} from "vite";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
    plugins: [handlebars()],
    build: {
        rollupOptions: {
            input: {
                app: './static/index.html'
            },
        },
    },
    server: {
        open: './static/index.html',
    },
});
