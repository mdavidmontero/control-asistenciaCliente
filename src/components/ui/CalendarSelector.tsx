import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { type DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { es } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
export type CalendarSelectorProps = React.HTMLAttributes<HTMLDivElement> & {
  setDateSelected: React.Dispatch<
    React.SetStateAction<{ from: Date | undefined; to: Date | undefined }>
  >;
};

export function CalendarSelector(props: CalendarSelectorProps) {
  const { setDateSelected } = props;
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 5)),
    to: new Date(),
  });

  useEffect(() => {
    setDateSelected({
      from: date?.from,
      to: date?.to,
    });
  }, [date, setDateSelected]);

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Selecciona un rango de fechas</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            className="rounded-md border"
            locale={es}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
