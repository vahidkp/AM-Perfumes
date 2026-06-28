import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

export async function POST(req: NextRequest) {
  const { amount } = await req.json()

  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: 'Razorpay is not configured on the server.' },
      { status: 501 }
    )
  }

  try {
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret })
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // paise
      currency: 'AED',
      receipt: `order_${Date.now()}`,
    })
    return NextResponse.json({ orderId: order.id })
  } catch (error) {
    console.error('Razorpay order error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
