"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchParamType } from "~/Global-type/Search-Param";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

const DateFilter = ({
  searchQuery,
  path,
  keyWord,
}: {
  searchQuery: SearchParamType[];
  path: string;
  keyWord: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [date, setDate] = useState<string>("");
  const fetchedParams = searchQuery.map((q) => {
    return {
      ParamName: q.ParamName,
      ParamValue:
        searchParams.get(q.ParamName) != null
          ? searchParams.get(q.ParamName)
          : "",
    } as SearchParamType;
  });
  useEffect(() => {
    if (searchParams.get(keyWord) == null || searchParams.get(keyWord) == "") {
      //setDate(new Date().toDateString());
    } else {
      setDate(new Date(searchParams.get(keyWord) || "").toDateString());
    }
  }, []);

  const onDateSelectedHandler = (date: Date | undefined) => {
    setDate(date?.toDateString() || "");
    let temp = fetchedParams.filter((q) => q.ParamName != keyWord);
    let tempParam = [
      ...temp,
      { ParamName: keyWord, ParamValue: date?.toDateString() },
      ,
      { ParamName: "pageno", ParamValue: "1" },
    ];
    let params: string = "";
    tempParam.map((q) => {
      params += q?.ParamName + "=" + q?.ParamValue + "&";
    });
    router.replace(path + "?" + params);
  };

  return (
    <div className="flex w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "h-[40px] w-full justify-start border border-black bg-[#F2F2F2] text-left font-normal sm:w-[180px]",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {/* {date ? format(date, "PPP") : <span>Pick a date</span>} */}
            {date ? date : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={new Date(date || "")}
            onSelect={onDateSelectedHandler}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateFilter;
