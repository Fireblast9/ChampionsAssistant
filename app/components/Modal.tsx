"use client";

import { useEffect, useRef } from "react";

type ModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function Modal({
  isOpen,
  title,
  message,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  onCancel,
  onConfirm,
}: Readonly<ModalProps>) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      onClose={onCancel}
      className="p-0 bg-transparent shadow-none backdrop:bg-black/50 overflow-visible inset-0 m-auto"
    >
      <button
        type="button"
        tabIndex={-1}
        onClick={onCancel}
        className="fixed inset-0 w-screen h-screen cursor-default bg-transparent border-none"
      />
      <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6 w-full max-w-sm text-inherit">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">{title}</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
          {message}
        </p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-400 dark:hover:bg-neutral-700 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500 hover:bg-red-600 text-white transition-colors"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
