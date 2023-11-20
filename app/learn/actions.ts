
import {SupabaseClient}from "@supabase/supabase-js";

export const sendToSupabase = async (supabase:any, content: string, title: string, user_id: string) => {
    try {
      const { data, error } = await supabase
        .from("text-content")
        .insert([{ content, user_id,title }])
        .select();

        if (error) throw error;

        return data

    } catch (error) {
      console.error("Error: ", error);
    }
  };

export const sendToServer = async (content: string) => {
    try {
      const response = await fetch("http://localhost:8084/api/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ education_level: 'college', text: content }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      console.log("server response /api/summary/getsummary: ", data);

      return data
    } catch (error) {
      console.error("Error: ", error);
      return error
    }
  };

  export const update_row = async (supabase: SupabaseClient, input: object, id: string) => {
    const { data, error } = await supabase
    .from('text-content')
    .update(input)
    .eq('id', id)
    .select()

  if (data && !error) {
    return data
  }
    return error 
  }

  export const delete_item = async (supabase: SupabaseClient, column: string, item_id: string) => {
const { data, error } = await supabase
.from('text-content')
.delete()
.eq(column, item_id)

if (error) {
  return error
}

return data

  }

  export const fetchUserTextContents = async (supabase: SupabaseClient, id: string) => {
    const { data, error } = await supabase
      .from("text-content")
      .select("*")
      .eq("user_id", id)
      .order('created_at', { ascending: false })

    if (data) {
      return data;
    }

    return error;
  };

  export const fetchUser = async (supabase: SupabaseClient) => {
    const { data, error } = await supabase.auth.getUser();
    if (data) {
      return data;
    }

    return error;
  };