// import ReduxProvider from '@/store/provider'
// import './globals.css'
// import Navbar from '@/components/Navbar'


// export const metadata = {
//   title: 'Notes App',
//   description: 'Simple Notes App with Next.js 15',
// }

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <ReduxProvider>
//           <Navbar />
//           {children}
//         </ReduxProvider>
//       </body>
//     </html>
//   )
// }

// ✅ File: src/app/layout.tsx (no "use client")

import './globals.css'
import ReduxProvider from '@/store/provider'
import LayoutClient from './LayoutClient'
// import LayoutClient from './LayoutClient'

export const metadata = {
  title: 'Notes App',
  description: 'Simple Notes App with Next.js 15',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <LayoutClient>{children}</LayoutClient>
        </ReduxProvider>
      </body>
    </html>
  )
}
