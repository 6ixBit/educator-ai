export const sendToSupabase = async (supabase:any, content: string, user_id: string) => {
    //TODO: Make it into a server action client component. No need for API for LLM network requests.
    try {
      const { data, error } = await supabase
        .from("text-content")
        .insert([{ content, user_id }])
        .select();

      if (error) throw error;
    } catch (error) {
      console.error("Error: ", error);
    }
  };

export const sendToServer = async (content: string) => {
    try {
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