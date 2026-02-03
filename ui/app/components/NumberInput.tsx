export function NumberInput(props: { name: string }) {
  return (
    <label>
      <div>{props.name}</div>
      <input
        className="border-2 border-white p-1"
        name={props.name}
        type="number"
      />
    </label>
  );
}
