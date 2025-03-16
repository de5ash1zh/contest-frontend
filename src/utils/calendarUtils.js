import { createEvents } from 'ics';

export const createCalendarEvent = (contest) => {
  // Parse start time
  const startDate = new Date(contest.startTime);
  
  // Calculate end time using duration (assuming duration is in minutes)
  const durationInMinutes = parseInt(contest.duration);
  const endDate = new Date(startDate.getTime() + durationInMinutes * 60000);

  // Format dates for ics
  const formatDate = (date) => {
    return [
      date.getFullYear(),
      date.getMonth() + 1, // months are 0-indexed in JS
      date.getDate(),
      date.getHours(),
      date.getMinutes()
    ];
  };

  const event = {
    start: formatDate(startDate),
    end: formatDate(endDate),
    title: `${contest.platform} - ${contest.name}`,
    description: `Coding contest on ${contest.platform}.\nContest Link: ${contest.url}`,
    url: contest.url,
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
    organizer: { name: contest.platform },
    categories: ['coding contest', contest.platform.toLowerCase()]
  };

  return new Promise((resolve, reject) => {
    createEvents([event], (error, value) => {
      if (error) {
        reject(error);
      }
      resolve(value);
    });
  });
};

export const downloadCalendarFile = async (contest) => {
  try {
    const icsContent = await createCalendarEvent(contest);
    
    // Create blob and download link
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${contest.platform}_${contest.name.replace(/\s+/g, '_')}.ics`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
    
    return true;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return false;
  }
};
