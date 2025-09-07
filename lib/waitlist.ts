import { supabase, WaitlistEntry } from './supabase'

export async function addToWaitlist(email: string): Promise<{ success: boolean; message: string }> {
  try {
    // Input sanitization and validation
    const sanitizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(sanitizedEmail)) {
      return { success: false, message: 'Please enter a valid email address' }
    }

    // Additional security: Check email length to prevent DoS
    if (sanitizedEmail.length > 254) {
      return { success: false, message: 'Email address is too long' }
    }

    // Rate limiting could be added here in production

    // Check if email already exists
    const { data: existingEntry, error: checkError } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', sanitizedEmail)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing email:', checkError)
      return { success: false, message: 'Something went wrong. Please try again.' }
    }

    if (existingEntry) {
      return { success: false, message: 'This email is already on our waitlist!' }
    }

    // Add to waitlist with additional security measures
    const waitlistEntry: WaitlistEntry = {
      email: sanitizedEmail,
      source: 'website',
      user_agent: typeof window !== 'undefined' ? 
        window.navigator.userAgent.substring(0, 500) : // Limit user agent length
        undefined
    }

    const { error } = await supabase
      .from('waitlist')
      .insert([waitlistEntry])

    if (error) {
      console.error('Error adding to waitlist:', error)
      return { success: false, message: 'Something went wrong. Please try again.' }
    }

    return { success: true, message: 'Thank you! You\'ve been added to our waitlist.' }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, message: 'Something went wrong. Please try again.' }
  }
}
