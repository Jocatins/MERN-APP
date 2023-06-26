import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3500,
		proxy: {
			"/api": {
				target: "http://localhost:8700",
				changeOrigin: true,
			},
		},
	},
});
