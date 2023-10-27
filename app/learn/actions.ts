
import {SupabaseClient}from "@supabase/supabase-js";

export const sendToSupabase = async (supabase:any, content: string, user_id: string) => {
    try {
      // TODO: Swap out for react query
      const { data, error } = await supabase
        .from("text-content")
        .insert([{ content, user_id }])
        .select();

        if (error) throw error;

        return data

    } catch (error) {
      console.error("Error: ", error);
    }
  };

export const sendToServer = async (content: string) => {
    try {
      // TODO: Swap out for react-query
      const response = await fetch("/api/summary/getSummary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      console.log("server response /api/summary/getsummary: ", data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  export const fetchUserTextContents = async (supabase: SupabaseClient, id: string) => {
    const { data, error } = await supabase
      .from("text-content")
      .select("*")
      .eq("user_id", id);

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