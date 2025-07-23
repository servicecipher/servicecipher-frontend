import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yiztpgnnqqrvcsbqtrzr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpenRwZ25ucXFydmNzYnF0cnpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyODE3ODIsImV4cCI6MjA2ODg1Nzc4Mn0.LNbhJzZR3xRO6oHNEUAJlEoyMy1ff0dVJ51770681bw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
