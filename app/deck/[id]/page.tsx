"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useDeck,
  useDeleteStudyCardFromDeck,
  useGetDeckMetaData,
} from "../hooks";
import { useEffect, useState } from "react";

import AddStudyCardModal from "@/components/AddStudyCardModal";
import { Button } from "@/components/ui/button";
import { CardStack } from "@/components/ui/card-stack";
import FlashCards from "@/app/decks/Flashcards";
import Header from "@/components/Header";
import LoginModal from "@/components/LoginModal";
import { Separator } from "@/components/ui/separator";
import { Table } from "@radix-ui/themes";
import UpRightArrow from "@/components/icons/UpRightArrow";
import { toast } from "sonner";
import { useIncrementStudyAttempt } from "../hooks";
import { useIntl } from "react-intl";
import { useRouter } from "next/navigation";
import useStore from "@/app/store";
import { useUserAuth } from "@/app/hooks";

type StudyCard = {
  front: string;
  back: string;
  [key: string]: any;
};

type DeckMetaData = {
  name: string;
  attempts: number;
  [key: string]: any;
};

export default function Page({
  params: { id: deck_uuid },
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const intl = useIntl();
  const { showLoginModal, setShowLoginModal } = useUserAuth();

  const [showAddStudyCardModal, setShowStudyCardModal] = useState(false);
  const [studyCards, setStudyCards] = useState<StudyCard[]>([]);

  // @ts-ignore
  const supabase = useStore((state) => state?.supabase);
  const { mutate } = useDeleteStudyCardFromDeck(supabase);
  const { data: deck, isLoading: isDeckLoading } = useDeck({
    supabase,
    deck_uuid,
  });

  const [deckMetaData, setDeckMetaData] = useState<DeckMetaData>();
  const { mutate: incrementStudyAttempt } = useIncrementStudyAttempt();
  const {
    data,
    error,
    isLoading: isDeckMetaDataLoading,
  } = useGetDeckMetaData(deck_uuid);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0 && !isDeckMetaDataLoading) {
      setDeckMetaData(data[0]);
    }
  }, [deck, isDeckMetaDataLoading]);

  useEffect(() => {
    if (deck && !isDeckLoading) {
      // @ts-ignore
      setStudyCards(deck);
    }
  }, [deck, isDeckLoading]);

  return (
    <div className="flex flex-col justify-center mt-1">
      <div className="sm:px-7 px-1">
        <Header hideSearchBar={true} handleSearch={() => {}} />
      </div>
      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
      />
      <AddStudyCardModal
        showModal={showAddStudyCardModal}
        setShowStudyCardModal={setShowStudyCardModal}
      />
      <div className="sm:pl-6 pl-2">
        <div className="flex justify-between mt-8">
          <h1 className="font-bold text-lg">
            {!isDeckMetaDataLoading && deckMetaData && deckMetaData.name}
          </h1>
          <Button
            variant="practise"
            className="mr-2"
            size="sm"
            onClick={() => {
              incrementStudyAttempt({
                deck_uuid: deck_uuid,
                current_attempts: deckMetaData?.attempts ?? 0,
              });

              router.push(`/deck/${deck_uuid}/practise`);
            }}
          >
            <p className="pr-4 font-semibold">Practise</p>
            <UpRightArrow height="19" width="19" />
          </Button>
        </div>
        {studyCards.length} cards
        <div className="px-0 sm:px-5">
          <FlashCards options={studyCards} />
        </div>
        <Card className="flex flex-col w-full  p-4 bg-white rounded-lg shadow-md mt-16">
          <CardHeader className="flex items-center flex-row justify-between pb-6">
            <CardTitle className="text-lg font-bold ">
              {intl.formatMessage({ id: "cards.table.title" })}
            </CardTitle>

            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                setShowStudyCardModal(true);
              }}
            >
              Add card
            </Button>
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
                studyCards.map((card: StudyCard, index: number) => (
                  <Table.Row key={index}>
                    <Table.Cell>{card.front}</Table.Cell>
                    <Table.Cell>{card.back}</Table.Cell>
                    <Table.Cell className="text-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          mutate({
                            card_uuid: card.card_uuid,
                          });

                          toast("Card has been deleted.");
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
