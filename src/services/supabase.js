import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ibogcdtwywefgdmoczhw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlib2djZHR3eXdlZmdkbW9jemh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NjQ1MDAsImV4cCI6MjA2NjE0MDUwMH0.KR7HQO9UnVOCurumnTiXNW9aEdIbxntBVje2H3Wos9k";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
