import { createClient } from '@/utils/supabase/client';

export async function getWaitlistCount(): Promise<number> {
  try {
    const supabase = createClient();
    
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error('Error fetching waitlist count:', error);
      return 0;
    }
    
    return count || 0;
  } catch (error) {
    console.error('Error in getWaitlistCount:', error);
    return 0;
  }
}
