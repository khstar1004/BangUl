import { BeakerIcon, ChartBarIcon, CogIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/images/bangul.png" width={40} height={40} alt="방울박사" className="mr-2 rounded-full" style={{ width: 'auto', height: 'auto' }} />
          <h1 className="text-2xl font-bold">방울박사</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/" className="hover:text-accent transition-colors duration-200 flex items-center"><BeakerIcon className="h-5 w-5 mr-1" /> 홈</Link></li>
            <li><Link href="/stats" className="hover:text-accent transition-colors duration-200 flex items-center"><ChartBarIcon className="h-5 w-5 mr-1" /> 통계</Link></li>
            <li><Link href="/settings" className="hover:text-accent transition-colors duration-200 flex items-center"><CogIcon className="h-5 w-5 mr-1" /> 설정</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}