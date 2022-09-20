module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}'],
    theme: {
        fontFamily: {
            'junction': 'Junction',
        },
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography')
    ],
}
