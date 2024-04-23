/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textColor: {
        skin: {
          main: 'var(--color-text-main)',
          second: 'var(--color-text-second)',
        },
      },
      backgroundColor: {
        skin: {
          main: 'var(--color-bg-main)',
          toggle: 'var(--color-bg-toggle)',
          screen: 'var(--color-bg-screen)',
          key: 'var(--color-key-bg)',
          'key-result': 'var(--color-key-result)',
          'key-num': 'var(--color-key-num)',
        },
      },
      borderColor: {
        skin: {
          'key-sd': 'var(--color-key-sd)',
          'key-result-sd': 'var(--color-key-result-sd)',
          'key-num-sd': 'var(--color-key-num-sd)',
        },
      },
    },
  },
  plugins: [],
};
