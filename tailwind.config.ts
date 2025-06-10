import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}', // For Next.js App Router
    './src/**/*.{js,ts,jsx,tsx,mdx}',  // If you use a 'src' directory
  ],
  theme: {
    extend: {
      // Add any theme customizations here
      // For example, to integrate with MUI's theme (more advanced):
      // colors: {
      //   primary: 'var(--mui-palette-primary-main)',
      //   secondary: 'var(--mui-palette-secondary-main)',
      // },
    },
  },
  plugins: [],
}
export default config
