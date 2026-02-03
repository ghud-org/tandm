"use client";
import { SubmitEvent, useEffect, useRef, useState } from "react";

interface Tandm {
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
  const [total, setTotal] = useState<number>(0);
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
      <form className="flex flex-col gap-4" onSubmit={createTandm}>
        <TextInput name="Name" required />
        <DateTimeInput name="Date" />
        <NumberInput name="Amount" />
        <button className="border-2 border-cyan-400" type="submit">
          Create Tandm
        </button>
      </form>
      <div className="border-2 border-amber-600">
        <span>Total: {total}</span>
      </div>
      <ul>
        {tandms.map((tandm) => {
          return (
            <div key={tandm.id} className="border-2 border-amber-300">
              <li>Name: {tandm.name}</li>
              <li>Date: {tandm.date}</li>
              <li>Amount: {tandm.amount}</li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export function TextInput(props: { name: string; required?: boolean }) {
  return (
    <label>
      <div>{props.name}</div>
      <input
        className="border-2 border-white"
        name={props.name}
        type="text"
        required={props.required}
      />
    </label>
  );
}

export function NumberInput(props: { name: string }) {
  return (
    <label>
      <div>{props.name}</div>
      <input
        className="border-2 border-white"
        name={props.name}
        type="number"
      />
    </label>
  );
}

export function DateTimeInput(props: { name: string }) {
  return (
    <label>
      <div>{props.name}</div>
      <input
        className="border-2 border-white"
        name={props.name}
        type="datetime-local"
        defaultValue={new Date().toLocaleString()}
      />
    </label>
  );
}
