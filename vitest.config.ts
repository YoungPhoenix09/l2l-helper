import { defineConfig } from 'vitest/config'

export default defineConfig({
    build: {
        rollupOptions: {
            external: ["better-sqlite3"]
        }
    },
    test: {
        root: "l2l-helper",
        dir: "tests",
        exclude: ["**/e2e/*"]
    }
});