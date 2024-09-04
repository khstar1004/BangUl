'use client';

import { useState, useRef, useEffect } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

type Message = {
  content: string;
  role: 'user' | 'assistant';
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage: Message = { role: 'user', content: input };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messages: [...messages, userMessage] }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'API 응답이 올바르지 않습니다.');
        }

        const data = await response.json();
        const assistantMessage: Message = { 
          role: 'assistant', 
          content: data.content
        };
        setMessages(prevMessages => [...prevMessages, assistantMessage]);
      } catch (error) {
        console.error('API 오류:', error);
        setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: `죄송합니다. 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}` }]);
      }
    }
  }

  return (
    <div className="w-full lg:w-1/3 p-6 bg-white rounded-lg shadow-lg m-4 flex flex-col h-[600px]">
      <h2 className="text-2xl font-bold mb-4 text-primary">방울박사와 대화하기</h2>
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto mb-4 bg-background rounded-lg p-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            {msg.role === 'assistant' && (
              <div className="flex items-start mb-2">
                <Image src="/images/bangul.png" width={40} height={40} alt="방울박사" className="mr-2 rounded-full" style={{ width: 'auto', height: 'auto' }} />
                <span className="font-bold text-primary">방울박사</span>
              </div>
            )}
            <div className={`inline-block px-4 py-2 rounded-lg ${
              msg.role === 'user' ? 'bg-blue-200 text-black' : 'bg-white text-black shadow'
            }`}>
              <ReactMarkdown className="prose max-w-none">
                {msg.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary text-gray-800 bg-white"
          placeholder="메시지를 입력하세요..."
        />
        <button
          onClick={handleSend}
          className="bg-secondary text-white rounded-r-lg px-4 py-2 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}