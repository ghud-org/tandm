export function TextInput(props: { name: string; required?: boolean }) {
  return (
    <label>
      <div>{props.name}</div>
      <input
        className="border-2 border-white p-1"
        name={props.name}
        type="text"
        required={props.required}
      />
    </label>
  );
}
