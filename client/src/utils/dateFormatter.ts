const dateFormatter = (dateString: string): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const formattedDate = date.toLocaleDateString("en-US");

  return formattedDate;
};

export default dateFormatter;
