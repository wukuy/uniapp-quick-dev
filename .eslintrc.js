module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'standard'
    ],
    overrides: [
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        'vue'
    ],
    rules: {
        indent: [
            'error',
            4
        ],
        'vue/multi-word-component-names': 0,
        'space-before-function-paren': [
            'error',
            'never'
        ],
        'keyword-spacing': [
            'error',
            {
                overrides: {
                    if: {
                        after: false
                    },
                    else: {
                        before: false,
                        after: true
                    },
                    for: {
                        after: false
                    },
                    while: {
                        after: false
                    },
                    static: {
                        after: false
                    },
                    as: {
                        after: false
                    }
                }
            }
        ],
        'vue/html-indent': ['error', 4],
        'vue/max-attributes-per-line': ['error', {
            singleline: {
                max: 4
            },
            multiline: {
                max: 1
            }
        }]
    },
    globals: {
        uni: 'writable',
        $go: true,
        getCurrentPages: true
    }
}
