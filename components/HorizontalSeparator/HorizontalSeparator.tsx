import * as Separator from "@radix-ui/react-separator";
import "./styles.css";

export default function HorizontalSeparator() {
  return (
    <Separator.Root className="bg-white data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[15px]" />
  );
}
