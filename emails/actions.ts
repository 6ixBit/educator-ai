import DeadlineReminder from "./DeadlineReminder";
import { Resend } from "resend";

export const sendDeadlineReminderEmail = async (
  to: string,
  from: string = "onboarding@resend.dev"
) => {
  const resend = new Resend("re_JdAWRSaM_76KMhHxBXPkzvgr9obN8Awve");

  const { data, error } = await resend.emails.send({
    from: from,
    to: [to],
    subject: "Hello world",
    react: DeadlineReminder({ url: "hamzacarew.vercel.app" }),
  });

  if (error) {
    return error;
  }

  return data;
};
