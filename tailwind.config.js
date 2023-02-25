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
            screens: {
                'xm': { 'min' : '360px' },
                'sm': { 'min': '640px' },
                'md': { 'min': '768px' },
                'lg': { 'min': '1024px' },
                'xl': { 'min': '1280px' },
                '2xl': {'min': '1536px'}
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