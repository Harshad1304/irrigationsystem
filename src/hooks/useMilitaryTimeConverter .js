const useMilitaryTimeConverter = () => {
    
    const convertedTime = (timeStr) => {
      // Get hours (first 2 characters)
      const hours = parseInt(timeStr.slice(0, 2));
      
      // Get minutes (characters 2-4)
      const minutes = timeStr.slice(2, 4);
      
      // Determine AM or PM
      const ampm = hours >= 12 ? 'PM' : 'AM';
      
      // Convert to 12-hour format
      const standardHours = hours % 12 || 12;  // 0 becomes 12
      
      return `${standardHours}:${minutes} ${ampm}`;
    };
  
    return { convertedTime };
  };
  
  export default useMilitaryTimeConverter;