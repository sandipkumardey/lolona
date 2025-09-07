"use server";

import { EnvCheckResult, EnvCheckAction } from "@joycostudio/v0-setup";
import { createClient } from '@supabase/supabase-js';

export const checkEnvs: EnvCheckAction = async () => {
  // Only check environment variables in development
  if (process.env.NODE_ENV === 'production') {
    return {
      envs: [],
      allValid: true,
    };
  }

  const requiredEnvs = [
    { name: 'KV_REST_API_URL', label: 'KV REST API URL' },
    { name: 'KV_REST_API_TOKEN', label: 'KV REST API Token' },
  ];

  const envs: EnvCheckResult[] = requiredEnvs.map(env => ({
    name: env.name,
    label: env.label,
    isValid: Boolean(process.env[env.name]),
  }));

  const allValid = envs.every(env => env.isValid);

  return {
    envs,
    allValid,
  };
}

export async function subscribe(email: string): Promise<{ success: boolean; message: string }> {
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

    // Create Supabase client directly in server action
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    console.log('Environment check:', { 
      hasUrl: !!supabaseUrl, 
      hasKey: !!supabaseKey,
      url: supabaseUrl?.substring(0, 20) + '...'
    });
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables', { supabaseUrl, supabaseKey });
      return { success: false, message: 'Configuration error. Please try again later.' };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

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

    // Add to waitlist
    const { error } = await supabase
      .from('waitlist')
      .insert([{
        email: sanitizedEmail,
        source: 'website',
        user_agent: undefined // Server-side doesn't have access to user agent
      }])

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
