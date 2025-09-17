import { createClient } from "@supabase/supabase-js";

const URL = import.meta.env.APP_URL
const API_KEY = import.meta.env.APP_ACCESS_KEY

export const supabase = createClient(URL,API_KEY) 