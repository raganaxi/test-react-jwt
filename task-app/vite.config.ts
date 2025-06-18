import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		tailwindcss(),
		reactRouter(),
		tsconfigPaths(),
		{
			name: "disable-well-known-plugins",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Disable well-known plugins
          if (req.url?.startsWith("/.well-known/")) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.statusCode = 404;
            res.end("Not Found");
            return;
          }
            next();
        }
      ); 
      }
  },
  ],
})
