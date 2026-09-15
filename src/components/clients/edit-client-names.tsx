"use client";

import clsx from "clsx";
import { ChangeEvent, useState } from "react";
import { CenterDialog, DialogContent, InputApp } from "../general";
import { FaMapMarkedAlt, FaSave } from "react-icons/fa";
import { closeDialog } from "@/lib/client";
import { SAEditClientName } from "@/lib/server";

interface Props {
  role: "user" | "admin";
  clientId: string;
  valueName: string;
  valueLastName: string;
  className?: string;
}

const dialogId = "edit-client-name";

export const EditClientName = ({ className, valueName, valueLastName, clientId, role }: Props) => {
  const [firstName, setFirstName] = useState<string>(valueName);
  const [lastName, setLastName] = useState<string>(valueLastName);
  const [message, setMessage] = useState("");

  const handleChangeFirstName = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newValue = e.target.value;
    setFirstName(newValue);
  };

  const handleChangeLastName = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newValue = e.target.value;
    setLastName(newValue);
  };

  const handleClick = async () => {
    setMessage("Actualizando Nombre...");
    const { message, success } = await SAEditClientName(clientId, firstName, lastName);
    if (!success) {
      setFirstName(valueName);
      setLastName(valueLastName);
      return setMessage(message);
    }
    setMessage("");
    closeDialog(dialogId);
  };

  return (
    <>
      <button className={clsx(className)} popoverTarget={role === "admin" ? dialogId : ""}>
        {lastName}, {firstName}
      </button>

      <CenterDialog id={dialogId}>
        <DialogContent maxWRem={30}>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <InputApp
                type="text"
                Icon={FaMapMarkedAlt}
                label={`Edita el nombre`}
                name="firstName"
                inputId="firstName"
                value={firstName}
                onChange={handleChangeFirstName}
              />
              <InputApp
                type="text"
                Icon={FaMapMarkedAlt}
                label={`Edita el apellido`}
                name="lastName"
                inputId="lastName"
                value={lastName}
                onChange={handleChangeLastName}
              />
            </div>
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
