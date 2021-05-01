module.exports = {
    mode: "aot",
    purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                serif: ["Quicksand", "sans-serif"],
                mono: ["consolas", "monospace"],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
