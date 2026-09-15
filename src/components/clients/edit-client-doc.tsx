"use client";

import clsx from "clsx";
import { ChangeEvent, useState } from "react";
import { CenterDialog, DialogContent, InputApp } from "../general";
import { IoWallet } from "react-icons/io5";
import { TypeDocuments } from "../../generated/prisma/enums";
import { FaSave } from "react-icons/fa";
import { SAEditClientDocument } from "@/lib/server";
import { closeDialog } from "@/lib/client";

interface Props {
  role: "user" | "admin";
  clientId: string;
  className?: string;
  typeDocument: TypeDocuments;
  value: string;
}

const dialogId = "edit-client-doc";

export const EditClientDoc = ({ className, typeDocument, value, clientId, role }: Props) => {
  const [document, setDocument] = useState(value);
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newValue = e.target.value;
    setDocument(newValue);
  };

  const handleClick = async () => {
    setMessage("Actualizando Documento...");
    const { message, success } = await SAEditClientDocument(clientId, document);
    if (!success) {
      setDocument(value);
      return setMessage(message);
    }
    setMessage("");
    closeDialog(dialogId);
  };

  return (
    <>
      <button className={clsx(className)} popoverTarget={role === "admin" ? dialogId : ""}>
        <p className="text-done-button-text text-lg md:text-2xl">
          <IoWallet className="inline mr-1 mb-0.5" />
          {typeDocument}
        </p>
        <p className="font-bold text-xl md:text-2xl">{document}</p>
      </button>

      <CenterDialog id={dialogId}>
        <DialogContent maxWRem={20}>
          <div className="p-4 space-y-4">
            <InputApp
              type="text"
              Icon={IoWallet}
              label={`Edita el numero de documento`}
              name="numberDocument"
              inputId="numerDocument"
              value={document}
              onChange={handleChange}
            />

            <button
              className="px-3 py-1.5 bg-blue-02 rounded-lg shadow text-white hover:opacity-80 transition-all duration-300 cursor-pointer flex gap-3 items-center font-bold ml-auto"
              onClick={handleClick}>
              <FaSave />
              Guardar
            </button>

            {message && (
              <p
                className={clsx(
                  "text-sm font-bold",
                  message.includes("correctamente") ? "text-done-button-text" : "text-red-01",
                )}>
                {message}
              </p>
            )}
          </div>
        </DialogContent>
      </CenterDialog>
    </>
  );
};
