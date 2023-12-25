"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import FlashCards from "@/app/studycards/Flashcards";
import Link from "next/link";
import LoginModal from "@/components/LoginModal";
import { Separator } from "@/components/ui/separator";
import { Table } from "@radix-ui/themes";
import { fetchStudyCardsFromDeck } from "@/app/studycards/actions";
import { getDeckIDFromUUID } from "../actions";
import { useIntl } from "react-intl";
import useStore from "@/app/store";
import { useUserAuth } from "@/hooks/useUserAuth";

export default function Page({
  params: { id: deckUUID },
}: {
  params: { id: string };
}) {
  const intl = useIntl();
  const { showLoginModal, setShowLoginModal } = useUserAuth();
  const [studyCards, setStudyCards] = useState([]);
  const [deckData, setDeckData] = useState({});

  // @ts-ignore
  const supabase = useStore((state) => state?.supabase);

  useEffect(() => {
    // @ts-ignore
    const response = getDeckIDFromUUID(supabase, deckUUID);
    response.then((result) => {
      // @ts-ignore
      setDeckData({ ...result[0] });
    });
  }, [deckUUID, supabase]);

  useEffect(() => {
    if (deckData) {
      // @ts-ignore
      fetchStudyCardsFromDeck(supabase, deckData.id).then((res) => {
        const validStudyCards =
          Array.isArray(res) &&
          res
            .filter((card) => card.front && card.back)
            .map(({ front, back }) => ({ front, back }));
        // @ts-ignore
        setStudyCards(validStudyCards);
        console.log({ validStudyCards });
      });
    }
  }, [deckData, supabase]);

  return (
    <div className="flex flex-col justify-center mt-1">
      <div className="sm:px-7 px-1">
        <Link href="/studycards">
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
            Decks
          </Button>
        </Link>
        <Separator className="mt-4" />
      </div>
      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
      />
      <div className=" pl-8">
        <div className="flex justify-between mt-8">
          <h1 className="font-bold text-lg">
            {(deckData as { name: string })?.name || "None"}
          </h1>
          <Button variant="default" size="sm">
            Practise deck
          </Button>
        </div>
        {studyCards.length} cards
        <FlashCards options={studyCards} />
        <Card className="flex flex-col w-full  p-4 bg-white rounded-lg shadow-md mt-16">
          <CardHeader className="flex items-start justify-between pb-6">
            <CardTitle className="text-lg font-bold ">
              {intl.formatMessage({ id: "cards.table.title" })}
            </CardTitle>
          </CardHeader>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>
                  {intl.formatMessage({ id: "cards.front" })}
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  {intl.formatMessage({ id: "cards.back" })}
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  {intl.formatMessage({ id: "cards.actions" })}
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {studyCards &&
                studyCards.map((card, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{card.front}</Table.Cell>
                    <Table.Cell>{card.back}</Table.Cell>
                    <Table.Cell className="text-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          console.log("delete");
                        }}
                      >
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table.Root>
        </Card>
      </div>
    </div>
  );
}
