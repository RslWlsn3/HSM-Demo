// src/app/page.tsx
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/overview')  // This matches your overview page path
}