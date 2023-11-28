import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import * as Menubar from "@radix-ui/react-menubar";
import Link from "next/link";
import { useIntl } from "react-intl";

interface IHamburgerMenu {
  items: menuItem[];
}

type menuItem = {
  name: string;
  url: string;
  onClick?: () => void;
};

export default function HamburgerMenu({ items }: IHamburgerMenu) {
  const intl = useIntl();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="inline-flex h-[35px] w-[35px] items-center justify-center rounded-full bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
          aria-label="Dropdown menu"
          style={{ width: "2rem" }}
        >
          <HamburgerMenuIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="data-[side=top]:animate-slideDownAndFade  data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-50 min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
          sideOffset={5}
        >
          {items.map((item, idx) => {
            return (
              <Link key={idx} href={item.url} style={{ width: "auto" }}>
                <DropdownMenu.Item
                  key={idx}
                  className="group relative flex h-10 w-full select-none items-center justify-center rounded-[3px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
                  onSelect={item.onClick}
                >
                  <Menubar.Separator className="MenubarSeparator" />
                  {item.name}
                </DropdownMenu.Item>
              </Link>
            );
          })}

          <DropdownMenu.Arrow className="fill-white" />
          <form action="/auth/sign-out" method="post">
            <div className="group relative flex h-10 w-full select-none items-center justify-center rounded-[3px] text-[13px] leading-none text-red-400 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1">
              <button>
                {intl.formatMessage({ id: "hamburger.signout.text" })}
              </button>
            </div>
          </form>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
