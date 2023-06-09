import { NextResponse } from 'next/server'

export async function GET (req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('offerId') as string

  const res = await fetch(`https://api.infojobs.net/api/9/offer/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${process.env.AUTH_TOKEN as string}`,
      'Access-Control-Allow-Origin': '*'
    }
  })
  const parsed = await res.json()

  return NextResponse.json(parsed)
}
