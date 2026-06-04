const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: '.',
    testMatch: '**/variation.test.js',
    timeout: 30000,
    retries: 1,
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
                userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
            },
        },
    ],
});
