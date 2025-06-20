import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    root: 'src',
    publicDir: '../public',
    base: './', // Ensures relative paths are used in the output
    plugins: [react()],
    resolve: {
        alias: {
            '@dev': path.resolve(__dirname, 'src'),
        },
    },
    build: {
        outDir: '../wwwroot', // Output directory
        emptyOutDir: true, // Clear the output directory before building
        assetsDir: 'assets', // Directory for static assets (images, fonts, etc.)
        rollupOptions: {
            input: './src/index.html', // Entry point for the app
            output: {
                entryFileNames: 'js/[name]-[hash].js', // JavaScript files in the 'js' folder
                chunkFileNames: 'js/[name]-[hash].js', // Code-split chunks in the 'js' folder
                assetFileNames: (assetInfo) => {
                    // Place CSS files in 'css' and other assets in 'assets'
                    if (assetInfo.name?.endsWith('.css')) {
                        return 'css/[name]-[hash][extname]';
                    }
                    return 'assets/[name]-[hash][extname]';
                },
                manualChunks: {
                    react: ['react', 'react-dom'],
                    redux: ['redux', '@reduxjs/toolkit', 'react-redux'],
                    victory: ['victory'],
                    chartjs: ['chart.js', 'react-chartjs-2'],
                    recharts: ['recharts'],
                },
            },
        },
    },
    server: {
        port: 3011, // Development server port
        open: true, // Automatically open the app in the browser
    },
});