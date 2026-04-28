"use client";

import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "../../../components/Modal";
import { deleteTeam } from "../../actions";

export default function DeleteButton({
  id,
  name,
}: Readonly<{ id: Readonly<string>; name: Readonly<string> }>) {
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  function handleDelete(id: string) {
    deleteTeam(id);
    setConfirmationOpen(false);
  }

  return (
    <>
      <button
        type="button"
        className="ml-auto px-4 py-3 opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
        onClick={() => setConfirmationOpen(true)}
      >
        <FaRegTrashAlt />
      </button>
      <Modal
        isOpen={confirmationOpen}
        title="Delete Confirmation"
        message={`Are you sure you want to delete team: ${name}`}
        onCancel={() => setConfirmationOpen(false)}
        onConfirm={() => handleDelete(id)}
      />
    </>
  );
}
