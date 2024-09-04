import dynamic from 'next/dynamic'
import Header from './components/Header'
import Dashboard from './components/Dashboard'

const ChatInterface = dynamic(() => import('./components/ChatInterface'), { ssr: false })

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-primary text-center">스마트 물 관리 대시보드</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <Dashboard />
          <ChatInterface />
        </div>
      </main>
      <footer className="bg-primary text-white text-center py-4">
        <p>&copy; 2023 방울박사. All rights reserved.</p>
      </footer>
    </div>
  )
}