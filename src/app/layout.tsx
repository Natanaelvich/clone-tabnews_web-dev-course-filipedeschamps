import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tabnews Clone',
  description: 'Tabnews Clone - project for learning Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
