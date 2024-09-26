// Helper function to convert time range into ISO DateTime strings with a specific date
export default function convertToISO(timeRange: any, targetDate: any) {
    const [start, end] = timeRange.split(' - ');

    const [startHours, startMinutes] = start.split(':');
    const [endHours, endMinutes] = end.split(':');

    const initTime = new Date(targetDate);
    initTime.setHours(startHours, startMinutes, 0, 0); // Setting time (hours, minutes, seconds, milliseconds)

    const endTime = new Date(targetDate);
    endTime.setHours(endHours, endMinutes, 0, 0);

    return {
        initTime: initTime.toISOString(),
        endTime: endTime.toISOString()
    };
}
