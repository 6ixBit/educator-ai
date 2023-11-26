import * as Form from "@radix-ui/react-form";
import Image from "next/image";

export default function SearchHeader({
  handleSearch,
}: {
  handleSearch: (value: string) => void;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <h1 className="text-3xl font-bold mb-2 text-slate-300">
        What will you{" "}
        <span
          style={{
            background: "linear-gradient(to right, #1BFFFF, #ED1E79)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Learn
        </span>{" "}
        today?
      </h1>
      <Form.Root>
        <Form.Field name="content">
          <div className="rounded-full border w-60 flex items-center">
            <Form.Control asChild>
              <div className="relative">
                <input
                  type="text"
                  className="border rounded-md py-2 pl-10 px-4 flex-grow text-left text-white"
                  placeholder="Search..."
                  onChange={handleChange}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Image
                    src="/search.png"
                    width={20}
                    height={20}
                    alt="delete button"
                    style={{ transition: "transform 0.2s" }}
                    className="hover:scale-110"
                  />
                </div>
              </div>
            </Form.Control>
          </div>
        </Form.Field>
      </Form.Root>
    </div>
  );
}
