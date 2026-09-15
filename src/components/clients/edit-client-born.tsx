"use client";

import clsx from "clsx";
import { ChangeEvent, useState } from "react";
import { CenterDialog, DialogContent, InputApp } from "../general";
import { FaBirthdayCake, FaSave } from "react-icons/fa";
import { closeDialog } from "@/lib/client";
import { formatDate } from "@/lib/shared";
import { SAEditClientBorn } from "@/lib/server";

interface Props {
  role: "user" | "admin";
  clientId: string;
  value: Date;
  className?: string;
}

const dialogId = "edit-client-born";

export const EditClientBorn = ({ className, value, clientId, role }: Props) => {
  const [born, setBorn] = useState<Date>(value);
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newValue = new Date(e.target.value);
    setBorn(newValue);
  };

  const handleClick = async () => {
    setMessage("Actualizando Nacimiento...");
    const { message, success } = await SAEditClientBorn(clientId, born);
    if (!success) {
      setBorn(value);
      return setMessage(message);
    }

    setMessage("");
    closeDialog(dialogId);
  };

  return (
    <>
      <button className={clsx(className)} popoverTarget={role === "admin" ? dialogId : ""}>
        <p className="text-done-button-text text-lg md:text-2xl">
          <FaBirthdayCake className="inline mr-1 mb-0.5" />
          Nacimiento
        </p>
        <p className="font-bold text-xl md:text-2xl">{formatDate(born)[0]}</p>
      </button>

      <CenterDialog id={dialogId}>
        <DialogContent maxWRem={20}>
          <div className="p-4 space-y-4">
            <InputApp
              type="date"
              Icon={FaBirthdayCake}
              label={`Edita la fecha de nacimiento`}
              name="born"
              inputId="born"
              value={born.toISOString().split("T")[0]}
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
