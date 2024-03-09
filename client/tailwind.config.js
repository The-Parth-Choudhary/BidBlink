/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1F8B59",
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    }
}