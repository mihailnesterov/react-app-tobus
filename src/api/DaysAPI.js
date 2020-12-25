/**
 * Days API
 * 
 */
const DAYS_URL = "http://localhost:5000/api/days/";

/**
 * Get day by id
 * 
 * @use async/await
 * @use fetch
 * 
 * @param {integer} id 
 */
export const getDay = async (id) => await fetch(DAYS_URL + id)

/**
 * Get all days
 * 
 * @use async/await
 * @use fetch
 */
export const getAllDays = async () => await fetch(DAYS_URL)
