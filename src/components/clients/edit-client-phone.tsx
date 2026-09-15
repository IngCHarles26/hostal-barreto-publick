"use client";

import clsx from "clsx";
import { ChangeEvent, useState } from "react";
import { CenterDialog, DialogContent, InputApp } from "../general";
import { FaPhoneAlt, FaSave } from "react-icons/fa";
import { closeDialog } from "@/lib/client";
import { SAEditClientPhone } from "@/lib/server";

interface Props {
  role: "user" | "admin";
  clientId: string;
  value: string;
  className?: string;
}

const dialogId = "edit-client-phone";

export const EditClientPhone = ({ className, value, clientId, role }: Props) => {
  const [phone, setPhone] = useState<string>(value);
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newValue = e.target.value;
    setPhone(newValue);
  };

  const handleClick = async () => {
    setMessage("Actualizando Telefono...");
    const { message, success } = await SAEditClientPhone(clientId, phone);
    if (!success) {
      setPhone(value);
      return setMessage(message);
    }
    setMessage("");
    closeDialog(dialogId);
  };

  return (
    <>
      <button className={clsx(className)} popoverTarget={role === "admin" ? dialogId : ""}>
        <p className="text-done-button-text text-lg md:text-2xl">
          <FaPhoneAlt className="inline mr-1 mb-0.5" />
          Telefono
        </p>
        <p className="font-bold text-xl md:text-2xl">{phone}</p>
      </button>

      <CenterDialog id={dialogId}>
        <DialogContent maxWRem={20}>
          <div className="p-4 space-y-4">
            <InputApp
              type="text"
              Icon={FaPhoneAlt}
              label={`Edita el telefono`}
              name="phone"
              inputId="phone"
              value={phone}
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
