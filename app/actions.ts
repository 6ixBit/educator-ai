
import {SupabaseClient}from "@supabase/supabase-js";

const SERVER_URL = "http://localhost:9004"

export const sendToDB = async (supabase:any, content: string, title: string, user_id: string) => {
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

export const gradeCaseStudy = async (caseStudy: string, caseStudyContext: string, userAnswer: string) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/casestudy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ case_study_question: caseStudy, case_study_context: caseStudyContext, user_answer: userAnswer}),
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    return data
  } catch (error) {
    console.error("Error: ", error);
    return error
  }
}

export const generateQuiz = async (quiz_context: string) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quiz_context: quiz_context}),
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    return data
  } catch (error) {
    console.error("Error: ", error);
    return error
  } 
}

export const sendFormDataForProcessing = async (content: string) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ education_level: 'highSchool', text: content }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

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