"use client";

import * as Form from "@radix-ui/react-form";

import Image from "next/image";
import { useIntl } from "react-intl";

export default function SearchHeader({
  handleSearch,
}: {
  handleSearch: (value: string) => void;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
  };

  const intl = useIntl();
  return (
    <div className="flex flex-col gap-2 items-center">
      <Form.Root>
        <Form.Field name="content">
          <div className="rounded-full border-2 border-gray-300 bg-gray-176 bg-opacity-95 w-full flex items-center">
            <div className="relative w-72">
              <Form.Control asChild>
                <input
                  type="text"
                  className="border rounded-full py-2 pl-10 px-4 flex-grow text-left text-black"
                  placeholder={intl.formatMessage({ id: "button.search.text" })}
                  onChange={handleChange}
                />
              </Form.Control>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Image
                  src="/search.png"
                  width={20}
                  height={20}
                  alt="search button"
                  style={{ transition: "transform 0.2s" }}
                  className="hover:scale-110"
                />
              </div>
            </div>
          </div>
        </Form.Field>
      </Form.Root>
    </div>
  );
}
