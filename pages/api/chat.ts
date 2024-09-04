import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { messages } = req.body

    if (!Array.isArray(messages)) {
      return res.status(400).json({ message: 'Invalid messages format' })
    }

    const response = await openai.chat.completions.create({
      model: "chatgpt-4o-latest", 
      messages: [
        { role: "system", content: "당신은 방울박사라는 이름의 물 관리 AI 어시스턴트입니다. 친절하고 전문적으로 대답해주세요." },
        ...messages,
      ],
    })

    if (!response.choices[0].message) {
      throw new Error('No message in response')
    }

    res.status(200).json(response.choices[0].message)
  } catch (error) {
    console.error('OpenAI API 오류:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error instanceof Error ? error.message : String(error) })
  }
}