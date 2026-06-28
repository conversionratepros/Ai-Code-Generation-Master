const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: '.',
    testMatch: '**/variation.test.js',
    timeout: 40000,
    retries: 0,
    reporter: [['list'], ['html', { open: 'never' }]],
    use: {
        headless: true,
        screenshot: 'only-on-failure',
        video: 'off',
    },
    projects: [
        {
            name: 'desktop',
            use: { viewport: { width: 1280, height: 900 } },
        },
        {
            name: 'mobile',
            use: {
                browserName: 'chromium',
                viewport: { width: 390, height: 844 },
                isMobile: true,
                hasTouch: true,
            },
        },
    ],
});
