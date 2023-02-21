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
                'MarketDeco': ["MarketDeco"],
                'DecoTech': ["DecoTech"],
                'DecoTechTL': ["DecoTechTL"],
            },
            boxShadow: {
                'custom': 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            }
        },
    },
    plugins: [
        {
            tailwindcss: {},
            autoprefixer: {},
        },
    ],
}