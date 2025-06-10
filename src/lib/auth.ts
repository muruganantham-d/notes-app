import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'testing#133'

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; email: string }
  } catch {
    return null
  }
}
