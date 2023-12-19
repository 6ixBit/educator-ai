import { SupabaseClient } from "@supabase/supabase-js";

const baseUrl = "http://localhost:8080";
const ExternalAPI = {
  generateQuiz: `${baseUrl}/api/quiz`,
  gradeCaseStudy: `${baseUrl}/api/casestudy/grade`,
  generateStudyCards: `${baseUrl}/api/studycards`,
  generateCaseStudy: `${baseUrl}/api/casestudy`,
  getKeyPoints: `${baseUrl}/api/keypoints`,
};

export const fetchProjects = async (supabase: SupabaseClient, id: string) => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", id)
    .order("created_at", { ascending: false });

  if (data) {
    return data;
  }

  return error;
};

export const addProjectToDB = async (
  supabase: SupabaseClient,
  content: string,
  title: string,
  user_id: string
) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .insert([{ content, user_id, title }])
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error Adding Project: ", error);
  }
};

export const addQuizToDB = async (
  supabase: SupabaseClient,
  questions: any,
  project_id: string,
  user_id: string
) => {
  try {
    const { data, error } = await supabase
      .from("quiz")
      .insert([{ questions, user_id , project_id}])
      .select();

    if (error) return { status: "failure", info: error };

    return data;
  } catch (error) {
    console.error("Error adding quiz to DB. ", error);
    return error
  }
};


export const generateQuiz = async (
  quiz_context: string,
  education_level: string
) => {
  const endpoint = ExternalAPI?.generateQuiz;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quiz_context: quiz_context,
        education_level: education_level,
      }),
    });

    const data = await response.json();

    return { status: "success", data };
  } catch (error) {
    return { status: "failure", info: "Failed to generate quiz.", error };
  }
};

export const generateStudyCards = async (
  context: string,
  education_level: string
) => {
  const endpoint = ExternalAPI.generateStudyCards;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        context: context,
        education_level: education_level,
      }),
    });

    const data = await response.json();

    return { status: "success", data };
  } catch (error) {
    return { status: "failure", info: "Failed to generate quiz.", error };
  }
};

export const generateCaseStudy = async (
  context: string,
  education_level: string
) => {
  const endpoint = ExternalAPI.generateCaseStudy;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        context: context,
        education_level: education_level,
      }),
    });

    const data = await response.json();

    return { status: "success", data };
  } catch (error) {
    return {
      status: "failure",
      info: "Failed to generate quiz.",
      error: error,
    };
  }
};
