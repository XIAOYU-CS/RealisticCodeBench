/**
 * Retrieves the current date and formats it as a human-readable string in the
 * 'Month Day, Year' format (e.g., "September 20, 2025").
 *
 * @returns {string} Formatted date string in 'Month Day, Year' format
 */
function getCurrentDateFormatted() {
    // Create a new Date object representing the current date and time
    const currentDate = new Date();

    // Define options for date formatting
    const options = {
        year: 'numeric',  // Full numeric year (e.g., 2024)
        month: 'long',    // Full month name (e.g., October)
        day: 'numeric'    // Day of the month (e.g., 1)
    };

    return currentDate.toLocaleString('en', options);
}