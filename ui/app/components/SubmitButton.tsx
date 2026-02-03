export function SubmitButton(props: { label: string }) {
  return (
    <button className="border-2 border-cyan-400 p-2" type="submit">
      {props.label}
    </button>
  );
}
