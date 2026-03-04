import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "commonjs",
            globals: {
                console: "readonly",
                process: "readonly",
                module: "readonly",
                require: "readonly",
                __dirname: "readonly",
            }
        },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error"
        }
    },
    {
        files: ["tests/**/*.js"],
        languageOptions: {
            globals: {
                describe: "readonly",
                it: "readonly",
                expect: "readonly",
                jest: "readonly"
            }
        }
    }
];
