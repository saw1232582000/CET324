'use server'

import { redirect } from 'next/navigation'


export default async function Home() {
  
  redirect('/server/login')
  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white"></main>
  // );
}
