import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://rymifscfezlemmuminwm.supabase.co";

const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5bWlmc2NmZXpsZW1tdW1pbndtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4MDQ5MTQsImV4cCI6MjAyMDM4MDkxNH0.a_Xx8DcG3ugqPdqLgwHqbOpIxCyW9WCRxrfhdnmfJYY"


export const supabase = createClient(supabaseUrl,supabaseAnonKey)