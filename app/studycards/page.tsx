"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import SearchHeader from "@/components/SearchHeader";
import { fetchDecks } from "./actions";
import { useIntl } from "react-intl";
import { useState } from "react";
import useStore from "../store";
import { useUserAuth } from "@/hooks/useUserAuth";

export default function Page() {
  const intl = useIntl();
  const [searchTerm, setSearchTerm] = useState("");

  const { userID } = useUserAuth();

  const supabase = useStore((state) => state?.supabase);

  const decks = fetchDecks(supabase, userID);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="flex flex-col justify-center mt-6">
      <SearchHeader handleSearch={handleSearch} />

      <Card className="flex flex-col w-full p-4 bg-white rounded-lg shadow-md">
        <CardHeader className="flex flex-row items-baseline justify-between pb-2">
          <CardTitle className="text-lg font-bold">
            {intl.formatMessage({ id: "decks.title" })}
          </CardTitle>
        </CardHeader>

        <CardContent>hey</CardContent>
      </Card>
    </div>
  );
}
