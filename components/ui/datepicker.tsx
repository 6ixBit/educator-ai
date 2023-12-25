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
import { convertToISODateString } from "@/lib/utils";
import { format } from "date-fns";
import { useProjectDateMutation } from "@/app/projects/hooks";
import useStore from "@/app/store";

interface IDatePicker {
  project_uuid: string;
}

export default function DatePicker({ project_uuid }: IDatePicker) {
  const [date, setDate] = React.useState<Date>();
  // @ts-ignore
  const supabase = useStore((state) => state?.supabase);

  const { mutate, isLoading, isError, isSuccess } = useProjectDateMutation({
    project_uuid,
    supabase,
    due_date: date,
  });

  useEffect(() => {
    // @ts-ignore
    console.log("mutate: ", mutate({ date }));
    console.log({ isSuccess });
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant={"secondary"}
          className={cn(
            "text-black justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Set deadline</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
