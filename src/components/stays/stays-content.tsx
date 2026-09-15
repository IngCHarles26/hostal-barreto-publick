"use client";

import { getNow, months, years } from "@/lib/shared";
import { FilterSelect, PageContent, PageHeader, SearchButton } from "../general";
import { StaysTable } from "./stays-table";
import { ChangeEvent, useState } from "react";
import { useMessageStore, useStayStore } from "@/store";
import { SAgetStaysByFilters } from "@/lib/server";

const initialData = {
  room: "todos",
  month: "",
  year: `${new Date().getFullYear()}`,
};

interface Props {
  rooms: number[];
}

type Nationality = "todos" | "peruano" | "extranjero";

const monthList = months();
const now = getNow();
const [nowMonth, nowYear] = [now.getMonth(), now.getFullYear()];
const filteredMonths = monthList.slice(0, nowMonth + 1);

export const StaysContent = ({ rooms }: Props) => {
  const meses = months();
  const anios = years();

  const [monthSelect, setMonthSelect] = useState(filteredMonths);
  const [searchData, setSearchData] = useState(initialData);
  const [nationality, setNationality] = useState<Nationality>("todos");
  const { stSetLoadingMsg, stSetStaticMsg } = useMessageStore();
  const { foundData, setFoundData } = useStayStore();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name as keyof typeof searchData;
    const value = e.target.value;

    if (name == "year") {
      if (+value < nowYear) setMonthSelect(monthList);
      else setMonthSelect(filteredMonths);
    }

    setSearchData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    const { month, room, year } = searchData;

    if (!month || !room || !year) return stSetStaticMsg("Debes seleccionar todos los campos");

    stSetLoadingMsg("buscando");
    const ixMonth = meses.indexOf(month);
    const data = await SAgetStaysByFilters(+year, ixMonth, room === "todos" ? undefined : +room);
    const success = data.length > 0;
    const message = success ? "Datos encontrados" : "No hay datos para esos parametros";
    stSetStaticMsg(message, success);
    setFoundData(data);
  };

  const handleChangeNationality = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Nationality;
    setNationality(value);
  };

  const setShowData = (type: Nationality) => {
    if (type === "peruano")
      return foundData.filter((el) => el.clientInStay.some(({ client }) => client.country.flag === "🇵🇪"));
    if (type === "extranjero")
      return foundData.filter((el) => el.clientInStay.some(({ client }) => client.country.flag !== "🇵🇪"));
    return foundData;
  };

  return (
    <PageContent maxWRem={110}>
      <PageHeader>
        <FilterSelect
          id="select-stays-room"
          label="Habitacion:"
          options={["todos", ...rooms]}
          name="room"
          value={searchData.room}
          onChange={handleChange}
        />
        <FilterSelect
          id="select-stays-month"
          label="Mes:"
          options={monthSelect}
          name="month"
          value={searchData.month}
          onChange={handleChange}
        />
        <FilterSelect
          id="select-stays-year"
          label="Año:"
          options={anios}
          name="year"
          value={searchData.year}
          onChange={handleChange}
        />
        <FilterSelect
          id="select-stays-year"
          label="Año:"
          options={anios}
          name="year"
          value={searchData.year}
          onChange={handleChange}
        />

        <SearchButton onCLick={handleSearch} />

        <FilterSelect
          id="select-nationality"
          label="Mostrar Solo:"
          options={["todos", "peruano", "extranjero"]}
          name="nationality"
          value={nationality}
          onChange={handleChangeNationality}
        />
      </PageHeader>

      <StaysTable staysInfo={setShowData(nationality)} />
    </PageContent>
  );
};
