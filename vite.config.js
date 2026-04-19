import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import {VitePWA} from 'vite-plugin-pwa'  // 👈 추가

export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: '온숨',
                short_name: '온숨',
                start_url: '/',
                scope: '/',
                description: '부모님 쇼핑 도우미',
                theme_color: '#3B82F6',
                background_color: '#ffffff',
                display: 'standalone',
                icons: [
                    {
                        src: '/src/images/main.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ]
            },
            workbox: {
                runtimeCaching: [
                    {
                        urlPattern: ({request}) => request.destination === 'script' || request.destination === 'style',
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'static-resources',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 60 * 60 * 24 * 30
                            }
                        }
                    },
                    {
                        urlPattern: ({url}) => url.pathname.startsWith('/api'),
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'api-cache',
                            networkTimeoutSeconds: 5,
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 60 * 60
                            }
                        }
                    }
                ]
            }
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
    
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
            }
        }
    }

})