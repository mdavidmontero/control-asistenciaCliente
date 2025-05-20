import { CalendarSelector } from "./CalendarSelector";
interface Props {
  setDateSelected: React.Dispatch<
    React.SetStateAction<{
      from: Date | undefined;
      to: Date | undefined;
    }>
  >;
}
export default function CalendarFilter({ setDateSelected }: Props) {
  return (
    <div className="my-5">
      <CalendarSelector setDateSelected={setDateSelected} />
    </div>
  );
}
