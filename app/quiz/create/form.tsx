import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

export function Form() {
  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 lg:p-10">
      <h1 className="text-2xl font-bold text-center mb-6">Create a Quiz</h1>
      <div className="grid gap-6">
        <div className="grid gap-1.5 grid-cols-2">
          <Button className="w-full flex justify-between items-center bg-green-500 text-white">
            Upload PDF
            <span className="material-icons">picture_as_pdf</span>
          </Button>
          <Button className="w-full flex justify-between items-center bg-yellow-500 text-white">
            Upload Text File
            <span className="material-icons">insert_drive_file</span>
          </Button>
        </div>
        <div className="flex items-center justify-center mt-4">
          <hr className="border-gray-300 w-full" />
          <span className="px-2 text-gray-500 bg-white">OR</span>
          <hr className="border-gray-300 w-full" />
        </div>
        <div className="mt-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="raw-text"
          >
            Enter Raw Text
          </label>
          <textarea
            className="mt-1 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md border border-black border-opacity-20 rounded-lg"
            id="raw-text"
            name="raw-text"
            rows={3}
          />
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Number of Questions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
              <DropdownMenuLabel>Number of Questions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup defaultValue="10">
                <DropdownMenuRadioItem value="5">5</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="10">10</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="15">15</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="20">20</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu className="mt-4">
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Difficulty Level</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
              <DropdownMenuLabel>Difficulty Level</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup defaultValue="easy">
                <DropdownMenuRadioItem value="easy">Easy</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="medium">
                  Medium
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="hard">Hard</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu className="mt-4">
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Quiz Category</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
              <DropdownMenuLabel>Quiz Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup defaultValue="general">
                <DropdownMenuRadioItem value="general">
                  General Knowledge
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="science">
                  Science
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="history">
                  History
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="geography">
                  Geography
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button className="w-full mt-6 bg-gradient-to-r from-sky-500 to-purple-300">
          Generate Quiz
        </Button>
      </div>
    </div>
  );
}
