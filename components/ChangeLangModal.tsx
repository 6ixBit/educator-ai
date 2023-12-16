import { Modal } from "./Modal";
import { languageMapping } from "@/app/store";
import useStore from "@/app/store";

import { Select } from "@radix-ui/themes";

interface IChangeLangModal {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ({ showModal, setShowModal }: IChangeLangModal) {
  const state = useStore();
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
            }}
          >
            <Select.Trigger variant="soft" />

            <Select.Content>
              {Object.entries(languageMapping).map(([key, value]) => (
                <Select.Item key={key} value={key}>
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
