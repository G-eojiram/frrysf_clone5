import { createClient } from '@supabase/supabase-js'

const supabaseUrl =  'https://iwdfzrnksrvgrkpptfah.supabase.co'
const supabaseKey =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3ZGZ6cm5rc3J2Z3JrcHB0ZmFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQyNDY0MzcsImV4cCI6MjAzOTgyMjQzN30.YaKQLD5HeMadBFLXXdg4-Qmpzc3LMUGAOJRDLZsqgF4'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase