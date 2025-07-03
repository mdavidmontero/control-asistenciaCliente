import { Calendar } from "@/components/ui/calendar";
import { es } from "date-fns/locale";

interface Props {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}
export default function CalendarShared({ date, setDate }: Props) {
  return (
    <div className="flex justify-center lg:justify-start my-2">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        month={date}
        className="rounded-lg border bg-[#F1F1FC] p-3 shadow-md"
        locale={es}
      />
    </div>
  );
}
