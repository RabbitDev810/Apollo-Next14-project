/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: '2rem',
    },
    extend: {
      fontFamily: {
        "sans": ['Satoshi'],
        "sans-bold": ['Satoshi-bold'],
        "lexend": ['Lexend Deca'],
        "space": ['Space Grotesk'],
      },
      fontSize: {
        xs: ['0.75rem', '1.25rem'],
        sm: ['1.1rem', '1.5rem'],
        base: ['1.25rem', '2.25rem'],
        lg: ['3rem','3.75rem'],
        '2lg': ['24px', '32.4px'],
        '3lg': ['54.4PX', '68.01px'],
        '4lg': ['28px', '40.6px'],
        '5lg': ['34px', '43.2px'],
        '6lg': ['64px', '86.4px'],
        '7lg': ['32px', '44.8px'],
        'xl1': ['164px', '205px'],
        'xl2': ['130px', 1],
        'xl3': ['114px', 1],
        'xl4': ['100px', 1],
        'md1': ['21px', '28px'],
        'md2': ['30px', '38.2px'],
        'md3': ['17px', '21.69px'],
      },
      colors: {
        'regal-white': '#EAEAEA',
        grey : {
          10: '#ECFAFF',
          50: '#CDDBE1',
          100: '#EAEAEA'
        },
        green: {
          10: '#2D6D7B',
          20: '#00C8FF #032731'
        },
        blue: {
          10: '#10C8EC'
        },
        white: {
          10: '#DDF0FB'
        }
      },
      padding: {
        50 : "8px 32px 8px 32px",
        100: "24px 92px 24px 92px" 
      },
      borderRadius: {
        20: '20.923px',
        50: '50px',

      },
      gap: {
        10: '10px',
        20: '20px',
        30: '30px',
        40: '40px',
      },
      boxShadow: {
        '2xl': '0px 0px 83.691px 0px rgba(16, 200, 236, 0.30)',
        '3xl': '0 0px 20px 20px rgba(137, 49, 105, 1)'
      },
      backdropBlur: {
        'xl': 'blur(20.92274284362793px);'
      }
    },
  },
  plugins: [require("daisyui")],
}
