import { Tandm } from "../page";

export function TandmList(props: { tandms: Tandm[] }) {
  return (
    <ul>
      {props.tandms.map((tandm) => {
        return (
          <div key={tandm.id} className="border-2 border-amber-300">
            <li>Name: {tandm.name}</li>
            <li>Date: {tandm.date}</li>
            <li>Amount: {tandm.amount}</li>
          </div>
        );
      })}
    </ul>
  );
}
