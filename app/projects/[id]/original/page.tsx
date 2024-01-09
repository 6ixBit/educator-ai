"use client";

import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Link from "next/link";
import { formatDate } from "@/utility";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { useProjectData } from "../../hooks";
import { useUserAuth } from "@/app/hooks";

export default function Page() {
  // TODO: Blur user from seeing this if unauthenticated or unauthrozied.
  const { userID, showLoginModal, setShowLoginModal } = useUserAuth();
  const pathname = usePathname();

  const project_uuid = pathname.split("/projects/")[1].split("/original")[0];

  const { isLoadingProject, project } = useProjectData({
    project_uuid,
    userID,
  });

  const handleCopiedClick = () => {
    try {
      navigator.clipboard.writeText(project?.content);
      toast.success("Copied content to your clipboard!");
    } catch (err) {
      toast.error("Failed to copy content to clipboard");
    }
  };

  return (
    <div>
      <div className="sm:px-7 px-1">
        <Header hideSearchBar={true} />
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
