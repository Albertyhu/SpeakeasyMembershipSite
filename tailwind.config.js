/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/*.{html,js,css}",
        "./views/*.ejs",
    ],
    theme: {
        extend: {
            fontFamily: {
                'Chapleau': ["Chapleau"],
                'ChapleauBold': ["Chapleau Bold"],
                'ChapleauBoldItalic': ["Chapleau Bold Italic"],
                'ChapleauItalic': ["Chapleau Italic"],
                'Market_Deco': ["Market_Deco"],
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