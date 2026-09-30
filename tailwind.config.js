export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { ink: '#0a0a0a', char: '#1c1c1f', lime: '#c6ff00' },
    fontFamily: { display: ['"Barlow Condensed"', 'Impact', 'sans-serif'], sans: ['Inter', 'system-ui', 'sans-serif'] },
    keyframes: { up: { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'none' } }, slide: { from: { transform: 'translateX(100%)' }, to: { transform: 'none' } }, slideL: { from: { transform: 'translateX(-100%)' }, to: { transform: 'none' } }, fade: { from: { opacity: 0 }, to: { opacity: 1 } } },
    animation: { up: 'up .8s cubic-bezier(.2,.7,.2,1) both', slide: 'slide .3s ease-out', slideL: 'slideL .3s ease-out', fade: 'fade .25s ease-out' },
  } },
}
