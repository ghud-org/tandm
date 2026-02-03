export function DateTimeInput(props: { name: string }) {
  return (
    <label>
      <div>{props.name}</div>
      <input
        className="border-2 border-white p-1"
        name={props.name}
        type="datetime-local"
        defaultValue={new Date().toLocaleString()}
      />
    </label>
  );
}
