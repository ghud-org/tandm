"use client";
import { SubmitEvent, useEffect, useRef, useState } from "react";
import { TextInput } from "./components/TextInput";
import { NumberInput } from "./components/NumberInput";
import { DateTimeInput } from "./components/DateInput";
import { SubmitButton } from "./components/SubmitButton";
import { TandmList } from "./components/TandmList";

export interface Tandm {
  id: number;
  name: string;
  date: string;
  amount: number;
}

export default function Home() {
  const [tandms, setTandms] = useState<Tandm[]>([
    {
      id: 0,
      name: "name",
      date: new Date("2/1/2026").toLocaleString(),
      amount: 0,
    },
    {
      id: 1,
      name: "name",
      date: new Date("2/1/2026").toLocaleString(),
      amount: 5,
    },
  ]);

  const initializeTotal = () => {
    return tandms.reduce((sum, tandm) => sum + tandm.amount, 0);
  };

  const [total, setTotal] = useState<number>(initializeTotal);
  const idRef = useRef(1);

  const updateTotal = () => {
    let result = 0;
    tandms.forEach((tandm) => {
      result += tandm.amount;
    });
    setTotal(result);
  };

  const createTandm = (event: SubmitEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    setTandms([
      ...tandms,
      {
        id: ++idRef.current,
        name: data["Name"].toString(),
        date: new Date().toLocaleString(),
        amount: parseInt(data["Amount"].toString()) || 0,
      },
    ]);

    event.target.reset();
  };

  useEffect(() => {
    updateTotal();
  }, [tandms.length]);

  return (
    <div className="flex flex-col gap-4">
      <form
        className="flex flex-col gap-4 border-2 border-teal-500 p-4"
        onSubmit={createTandm}
      >
        <div className="flex gap-4">
          <TextInput name="Name" required />
          <DateTimeInput name="Date" />
          <NumberInput name="Amount" />
        </div>
        <SubmitButton label="Create Tandm" />
      </form>
      <div className="border-2 border-amber-600 p-4">
        <span>Total: {total}</span>
      </div>
      <TandmList tandms={tandms} />
    </div>
  );
}
