import * as React from "react";

import { Button } from "@react-email/button";
import { Heading } from "@react-email/components";
import { Html } from "@react-email/html";

export function DeadlineReminder({ url }: { url: string }) {
  return (
    <Html lang="en">
      <Heading as="h2">Project Reminder</Heading>
      <Button href={url}>Click me</Button>
    </Html>
  );
}

export default DeadlineReminder;

// https://demo.react.email/preview/vercel-invite-user?view=desktop
