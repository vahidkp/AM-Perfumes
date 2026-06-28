import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Verifies the Razorpay payment signature server-side before fulfilling an order.
export async function POST(req: NextRequest) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    await req.json()

  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Not configured' }, { status: 501 })
  }

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex')

  const valid = expected === razorpay_signature
  return NextResponse.json({ valid }, { status: valid ? 200 : 400 })
}
