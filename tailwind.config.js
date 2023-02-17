/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/*.{html,js,css}",
        "./views/*.ejs",
    ],
    theme: {
        extend: {
            fontFamily: {
                Chapleau: ["Chapleau"],
                ChapleauBold: ["ChapleauBold"],
                ChapleauBoldItalic: ["ChapleauBoldItalic"],
                ChapleauItalic: ["ChapleauItalic"],
            },
        },
    },
    plugins: [
        {
            tailwindcss: {},
            autoprefixer: {},
        },
    ],
}