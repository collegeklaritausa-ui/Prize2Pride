import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { users } from "../drizzle/schema";
import crypto from "crypto";

// In-memory storage for verification codes (in production, use Redis or database)
const verificationCodes = new Map<
  string,
  { code: string; expiresAt: Date; email: string }
>();

/**
 * Generate a random 6-digit verification code
 */
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send verification code to email (mock implementation)
 * In production, integrate with SendGrid, AWS SES, or similar
 */
export async function sendVerificationCode(email: string): Promise<string> {
  const code = generateVerificationCode();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  verificationCodes.set(email, { code, expiresAt, email });

  // Log the code for development (in production, send via email service)
  console.log(`[VERIFICATION CODE] Email: ${email}, Code: ${code}`);

  // Mock: In production, send actual email
  // await sendEmail({
  //   to: email,
  //   subject: 'A1 English Quiz - Verification Code',
  //   html: `<h1>Your verification code is: ${code}</h1>`
  // });

  return code;
}

/**
 * Verify the code and create/update user session
 */
export async function verifyCode(
  email: string,
  code: string
): Promise<{ success: boolean; userId?: number; error?: string }> {
  const stored = verificationCodes.get(email);

  if (!stored) {
    return { success: false, error: "No verification code found for this email" };
  }

  if (new Date() > stored.expiresAt) {
    verificationCodes.delete(email);
    return { success: false, error: "Verification code has expired" };
  }

  if (stored.code !== code) {
    return { success: false, error: "Invalid verification code" };
  }

  // Code is valid, create or update user
  const db = await getDb();
  if (!db) {
    return { success: false, error: "Database not available" };
  }

  try {
    // Generate a unique openId for this email
    const openId = `gmail-${email}-${crypto.randomBytes(8).toString("hex")}`;

    // Check if user exists
    const existingUsers = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    let userId: number;

    if (existingUsers.length > 0) {
      // Update existing user
      userId = existingUsers[0].id;
      await db
        .update(users)
        .set({
          lastSignedIn: new Date(),
        })
        .where(eq(users.id, userId));
    } else {
      // Create new user
      const result = await db.insert(users).values({
        openId,
        email,
        name: email.split("@")[0], // Use email prefix as default name
        loginMethod: "gmail",
        role: "user",
      });

      userId = result[0]?.insertId || 0;
    }

    // Clean up verification code
    verificationCodes.delete(email);

    return { success: true, userId };
  } catch (error) {
    console.error("Error verifying code:", error);
    return { success: false, error: "Failed to verify code" };
  }
}

/**
 * Clean up expired verification codes (run periodically)
 */
export function cleanupExpiredCodes(): void {
  const now = new Date();
  const entries = Array.from(verificationCodes.entries());
  for (const [email, data] of entries) {
    if (now > data.expiresAt) {
      verificationCodes.delete(email);
    }
  }
}
