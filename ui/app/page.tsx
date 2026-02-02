"use client";
import { Fragment, useEffect, useState } from "react";

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

  const updateTotal = () => {
    let result = 0;
    tandms.forEach((tandm) => {
      result += tandm.amount;
    });
    setTotal(result);
  };

  const createTandm = () => {
    setTandms([
      ...tandms,
      {
        id: 2,
        name: "created",
        date: new Date("3/1/2026").toLocaleString(),
        amount: 10,
      },
    ]);
  };

  useEffect(() => {
    updateTotal();
  }, [tandms.length]);

  return (
    <div className="flex flex-col gap-4">
      <div className="border-2 border-amber-600">
        <span>Total: {total}</span>
      </div>
      <button className="border-2 border-cyan-400" onClick={createTandm}>
        Create Tandm
      </button>
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
