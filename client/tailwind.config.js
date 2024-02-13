/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#40513b",
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    }
}