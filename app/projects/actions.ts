import { SupabaseClient } from "@supabase/supabase-js";
import { toast } from "sonner";

interface Card {
  front: string;
  back: string;
}

const baseUrl = "http://localhost:8080";
//const baseUrl = "https://protutor-ai-server.onrender.com";

export const ExternalAPI = {
  generateQuiz: `${baseUrl}/api/quiz`,
  generateTrueOrFalseQuiz: `${baseUrl}/api/quiz/trueorfalse`,

  gradeCaseStudy: `${baseUrl}/api/casestudy/grade`,
  generateStudyCards: `${baseUrl}/api/studycards`,
  generateCaseStudy: `${baseUrl}/api/casestudy`,
  getKeyPoints: `${baseUrl}/api/keypoints`,

  parsePdf: `${baseUrl}/api/pdf`,
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
  user_id: string,
  project_id?: string,
  question_type?: string
) => {
  try {
    const insertData = project_id
      ? {
          questions,
          user_uuid: user_id,
          project_id,
          question_type: question_type || "",
        }
      : { questions, user_uuid: user_id, question_type: question_type || "" };

    const { data, error } = await supabase
      .from("quiz")
      .insert([insertData])
      .select();

    if (error) return { status: "failure", info: error };

    return data;
  } catch (error) {
    console.error("Error adding quiz to DB. ", error);
    return error;
  }
};

export const addStudyCardsToDB = async (
  supabase: SupabaseClient,
  user_id: string,
  studyCards: any,
  deck_id?: string
) => {
  try {
    const cards = studyCards.cards.cards.map((card: Card) => ({
      user_id,
      deck_id,
      front: card.front,
      back: card.back,
    }));

    const { data, error } = await supabase
      .from("studycards")
      .insert(cards)
      .select();

    if (error) return { status: "Failure", info: error };

    return data;
  } catch (error) {
    console.error("Error adding quiz to DB. ", error);
    return error;
  }
};

export const addDeckToDB = async (
  supabase: SupabaseClient,
  name: string,
  user_id: string,
  project_id: string
) => {
  try {
    const { data, error } = await supabase
      .from("decks")
      .insert([{ name, user_id, project_id }])
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error Adding Deck: ", error);
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
    const cards = data.study_cards;

    // @ts-ignore
    return { status: "success", cards, deck: data.deck_name };
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
    const question = data.case_study.question;

    return { status: "success", question };
  } catch (error) {
    return {
      status: "failure",
      info: "Failed to generate quiz.",
      error: error,
    };
  }
};

export const generateKeyPoints = async (
  context: string,
  education_level: string
) => {
  const endpoint = ExternalAPI.getKeyPoints;

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
      info: "Failed to generate key points.",
      error: error,
    };
  }
};

export const addCaseStudyToDB = async (
  supabase: SupabaseClient,
  project_id: string,
  question: string
) => {
  try {
    const { data, error } = await supabase
      .from("casestudy")
      .insert([{ project_id, question }])
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error Adding Case Study: ", error);
  }
};

export const addKeyPointsToDB = async (
  supabase: SupabaseClient,
  project_id: string,
  key_points: []
) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .update({ key_points })
      .eq("id", project_id)
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error Adding Key Points: ", error);
  }
};

export const updateProjectDate = async (
  supabase: SupabaseClient,
  project_uuid: string,
  due_date: Date | undefined
) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .update({ due_date })
      .eq("project_uuid", project_uuid)
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error updating due date for project");
  }
};

export const getMainDeckForProject = async (
  supabase: SupabaseClient,
  project_id: number | undefined
) => {
  let { data, error } = await supabase
    .from("decks")
    .select("id, deck_uuid")
    .eq("project_id", project_id);

  if (error) throw error;

  return data;
};

export async function uploadPdf(file: File): Promise<void> {
  const endpoint = ExternalAPI.parsePdf;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      toast.success("PDF uploaded successfully.");
      console.log("Pdf Upload succesful.");

      return result;
    } else {
      // Handle server-side error
      toast.error(result.message || "An error occurred on the server.");
    }
  } catch (error) {
    // Handle client-side error
    console.error("Error uploading file:", error);
    toast.error("Error uploading file.");
  }
}
