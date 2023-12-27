"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import useStore from "@/app/store";

interface IDatePicker {
  project_uuid: string;
  current_deadline: Date | undefined;
}

export default function DatePicker({
  project_uuid,
  current_deadline,
}: IDatePicker) {
  const [date, setDate] = React.useState<Date | undefined>(current_deadline);
  const useQuery = useQueryClient();

  // @ts-ignore
  const supabase = useStore((state) => state?.supabase);

  const { mutate: updateProjectDate } = useMutation(
    (newDate: Date) => {
      return supabase
        .from("projects")
        .update({ due_date: newDate })
        .eq("project_uuid", project_uuid);
    },
    {
      onSettled: () => {
        useQuery.invalidateQueries("fetchProject");
      },
    }
  );

  useEffect(() => {
    if (date && date !== current_deadline) {
      updateProjectDate(date);
    }
  }, [date, updateProjectDate]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className={cn(
            "text-black justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {current_deadline ? (
            format(current_deadline, "PPP")
          ) : (
            <span>Change deadline</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          showOutsideDays={false}
          selected={date}
          onSelect={(date) => {
            setDate(date);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
