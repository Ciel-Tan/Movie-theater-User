import { format } from "date-fns";

export const formatDay = ({ date }: { date: string }) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    
    return `${day}/${month}/${year}`;
}

// export const customFormatDate = (date, stringFormat) => {
//   const parsedDate = new Date(date);

//   // Check if parsedDate is valid
//   if (isNaN(parsedDate.getTime())) {
//     console.error("Invalid date provided:", date);
//     return ""; // or you can throw an error if that suits your needs
//     // throw new Error("Invalid date provided");
//   }

//   return format(parsedDate, stringFormat);
// };