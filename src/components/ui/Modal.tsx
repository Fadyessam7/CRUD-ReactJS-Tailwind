import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { memo, ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
}

const Modal = ({
  isOpen,
  closeModal,
  title,
  description,
  children,
}: IProps) => {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none "
        onClose={closeModal}
      >
        <div className="fixed inset-0 bg-black/20 backdrop-blur-xs">
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="w-full max-w-md rounded-xl bg-white p-6  duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                {title && (
                  <DialogTitle
                    as="h1"
                    className="text-base/7 font-medium text-black"
                  >
                    {title}
                  </DialogTitle>
                )}
                <div className="mt-3 font-light">{description}</div>
                <div className="mt-4">{children}</div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default memo(Modal);
