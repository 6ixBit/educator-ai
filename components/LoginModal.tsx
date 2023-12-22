import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Modal } from "./Modal";

export default function ({
  showLoginModal,
  setShowLoginModal,
}: {
  showLoginModal: boolean;
  setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Modal
      icon={
        <Image
          src="/login.png"
          width={30}
          height={30}
          alt="delete button"
          style={{ transition: "transform 0.2s" }}
          className="hover:scale-110"
        />
      }
      open={showLoginModal}
      onOpenChange={setShowLoginModal}
      title="Hold up! You need an account to see this!"
      hideCloseButton={true}
      preventOutsideClick={true}
      description={
        <div className="flex justify-center mt-6">
          <Link href="/login">
            <div className="border-2 border-slate-600 rounded-full px-5 py-1 w-full glow flex items-center flex-row gap-4 hover:bg-slate-200 transition-colors duration-200">
              <p className="text-black text-lg">Sign In</p>
              <ArrowRightIcon style={{ height: "1.8em", width: "1.8em" }} />
            </div>
          </Link>
        </div>
      }
    />
  );
}
