describe('Backend Environment Sanity Check', () => {
    test('Environment is ready for tests', () => {
        expect(process.env.NODE_ENV).toBeDefined();
        expect(true).toBe(true);
    });
});
