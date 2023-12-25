"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";
import { formatDate } from "@/utility";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { useUserAuth } from "@/hooks/useUserAuth";
import { useUserData } from "@/hooks/useUserData";

export default function Page() {
  // TODO: Blur user from seeing this if unauthenticated or unauthrozied.
  const { userID, showLoginModal, setShowLoginModal } = useUserAuth();
  const pathname = usePathname();

  const project_uuid = pathname.split("/projects/")[1].split("/original")[0];

  const { isLoadingProject, project } = useUserData({
    projectID: project_uuid,
    userID,
  });

  const handleCopiedClick = () => {
    try {
      navigator.clipboard.writeText(project?.content);
      toast("Copied content to your clipboard!");
    } catch (err) {
      toast("Failed to copy content to clipboard");
    }
  };

  return (
    <div>
      <Toaster />
      <div className="sm:px-7 px-1">
        <Link href={`/projects/${project_uuid}`}>
          <Button variant="outline" size="sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </Button>
        </Link>
      </div>

      <div className="sm:px-7 px-1 pt-10">
        {!isLoadingProject && (
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {project?.title}
          </h2>
        )}

        <div className="flex flex-row justify-between pt-4">
          {!isLoadingProject && (
            <p className="text-sm text-muted-foreground mb-10 pt-2">
              {project?.created_at && formatDate(project?.created_at)}
            </p>
          )}

          <Button variant="outline" size="sm" onClick={handleCopiedClick}>
            Copy to clipboard
          </Button>
        </div>

        {!isLoadingProject && (
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            {project?.content}
          </p>
        )}
      </div>
    </div>
  );
}
