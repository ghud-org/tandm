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
