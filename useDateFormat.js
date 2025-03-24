
export default function DateFormat(date) {
  
    const dateStr = date;
    const dateObj = new Date(dateStr);

    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    //2023-02-01
   
    
    return formattedDate
}


export const DateTimeFormat = (date) => {
    const dateObj = new Date(date);

     // Get date parts
     const year = dateObj.getFullYear();
     const month = dateObj.toLocaleString('default', { month: 'short' });
     const day = dateObj.getDate().toString().padStart(2, "0"); // Day padded to 2 digits
     const hours = dateObj.getHours();
     const minutes = dateObj.getMinutes().toString().padStart(2, "0");
     const ampm = hours >= 12 ? 'pm' : 'am';
     const formattedHours = hours % 12 || 12; // Convert to 12-hour format
 
     // Format date string
     const formattedDate = `${day} ${month} ${year} ${formattedHours}:${minutes} ${ampm}`;
 
     return formattedDate;
}

export const formatDateToDMY = (date) => {

    const dateObj = new Date(date);

    // Get date parts
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear().toString().slice(-2); // Get last 2 digits of the year

    // Format date string
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}

export const formatDateToDMYWithHyphen = (date) => {

  const dateObj = new Date(date);

  // Get date parts
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear().toString().slice(-2); // Get last 2 digits of the year

  // Format date string
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export const formatDateToFullYear= (date) => {
  const dateObj = new Date(date);

  // Get date parts
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear().toString();

  // Format date string
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export const fullNameDateFormat = (date) => {

    // const months = [
    //   "January", "February", "March", "April",
    //   "May", "June", "July", "August",
    //   "September", "October", "November", "December"
    // ];

    const months = [
      "Jan", "Feb", "Mar", "Apr",
      "May", "Jun", "Jul", "Aug",
      "Sept", "Oct", "Nov", "Dec"
    ];
  
    const dateStr = date;
    const dateObj = new Date(dateStr);
  
    const monthIndex = dateObj.getMonth();
    const year = dateObj.getFullYear();
    const day = dateObj.getDate().toString().padStart(2, "0");
  
    const formattedDate = `${months[monthIndex]} ${day}, ${year}`;
  
    return formattedDate;
  }


//  '6th' format:

// export default function DateFormat(date) {
//     const dateObj = new Date(date);

//     // Function to get ordinal suffix
//     const getOrdinalSuffix = (day) => {
//         if (day > 3 && day < 21) return 'th';
//         switch (day % 10) {
//             case 1: return 'st';
//             case 2: return 'nd';
//             case 3: return 'rd';
//             default: return 'th';
//         }
//     };

//     // Get date parts
//     const year = dateObj.getFullYear();
//     const month = dateObj.toLocaleString('default', { month: 'short' });
//     const day = dateObj.getDate();
//     const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;
//     const hours = dateObj.getHours();
//     const minutes = dateObj.getMinutes().toString().padStart(2, "0");
//     const ampm = hours >= 12 ? 'pm' : 'am';
//     const formattedHours = hours % 12 || 12; // Convert to 12-hour format

//     // Format date string
//     const formattedDate = `${dayWithSuffix} ${month} ${year} ${formattedHours}:${minutes} ${ampm}`;

//     return formattedDate;
// }

// For a combined approach of 06 and 6th

// export default function DateFormat(date, formatType = 'padded') {
//     const dateObj = new Date(date);

//     // Function to get ordinal suffix
//     const getOrdinalSuffix = (day) => {
//         if (day > 3 && day < 21) return 'th';
//         switch (day % 10) {
//             case 1: return 'st';
//             case 2: return 'nd';
//             case 3: return 'rd';
//             default: return 'th';
//         }
//     };

//     // Get date parts
//     const year = dateObj.getFullYear();
//     const month = dateObj.toLocaleString('default', { month: 'short' });
//     const day = dateObj.getDate();
//     const dayFormatted = formatType === 'padded' ? day.toString().padStart(2, "0") : `${day}${getOrdinalSuffix(day)}`;
//     const hours = dateObj.getHours();
//     const minutes = dateObj.getMinutes().toString().padStart(2, "0");
//     const ampm = hours >= 12 ? 'pm' : 'am';
//     const formattedHours = hours % 12 || 12; // Convert to 12-hour format

//     // Format date string
//     const formattedDate = `${dayFormatted} ${month} ${year} ${formattedHours}:${minutes} ${ampm}`;

//     return formattedDate;
// }
