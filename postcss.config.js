module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    process.env.NODE_ENV === 'production' && require('@fullhuman/postcss-purgecss')({
      
        content: [ "./src/**/*.css", 
  "./*.html"],
     
      safelist: [
        'bg-[#020101]',
        'swiper-pagination-bullet',
        'swiper-pagination-bullet-active',

      
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ].filter(Boolean),
}