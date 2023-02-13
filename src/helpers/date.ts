const formatDate = (date: string) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const newDate = new Date(date);
  const month = monthNames[newDate.getMonth()];
  const day = newDate.getDate();
  const year = newDate.getFullYear();
  return `${month} ${day}th, ${year}`;
};

export default formatDate;
