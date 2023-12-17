"use client";

import { Modal } from "./Modal";
import { Select } from "@radix-ui/themes";
import { languageMapping } from "@/app/store";
import { useRouter } from "next/navigation";
import useStore from "@/app/store";

interface IChangeLangModal {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ({ showModal, setShowModal }: IChangeLangModal) {
  const state = useStore();
  const router = useRouter();

  router;
  return (
    <Modal
      open={showModal}
      onOpenChange={setShowModal}
      title="Change System Language"
      description={
        <div className="pt-3 pl-3">
          <Select.Root
            // @ts-ignore
            defaultValue={state.getLanguage()}
            onValueChange={(value) => {
              // @ts-ignore
              state.setLanguage(value);
              localStorage.setItem("language", value);
              router.refresh();
            }}
          >
            <Select.Trigger variant="soft" />

            <Select.Content>
              {Object.entries(languageMapping).map(([key, value]) => (
                <Select.Item
                  key={key}
                  value={key}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  {value}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>
      }
    />
  );
}
