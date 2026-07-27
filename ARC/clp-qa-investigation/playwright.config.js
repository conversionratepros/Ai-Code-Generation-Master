const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: '.',
    testMatch: '**/clp-qa.test.js',
    timeout: 60000,
    retries: 0,
    reporter: [
        ['list'],
        ['html', { open: 'never', outputFolder: 'test-report' }],
    ],
    use: {
        // headed=true bypasses the ARC WAF that blocks headless Chromium
        headless: false,
        launchOptions: {
            args: ['--disable-blink-features=AutomationControlled'],
        },
        video: 'on',
        screenshot: 'on',
        trace: 'on',
    },
    projects: [
        {
            name: 'desktop-chrome',
            use: {
                browserName: 'chromium',
                viewport: { width: 1440, height: 900 },
                userAgent:
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
            },
        },
        {
            name: 'mobile-android',
            use: {
                browserName: 'chromium',
                viewport: { width: 390, height: 844 },
                isMobile: true,
                hasTouch: true,
                userAgent:
                    'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
            },
        },
        {
            name: 'mobile-iphone',
            use: {
                browserName: 'webkit',
                viewport: { width: 390, height: 844 },
                isMobile: true,
                hasTouch: true,
                userAgent:
                    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
            },
        },
    ],
    outputDir: 'test-results',
});
