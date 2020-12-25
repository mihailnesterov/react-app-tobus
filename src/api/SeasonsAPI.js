/**
 * Seasons API
 * 
 */
const SEASONS_URL = "http://localhost:5000/api/seasons/";

/**
 * Get season by id
 * 
 * @use async/await
 * @use fetch
 * 
 * @param {integer} id 
 */
export const getSeason = async (id) => await fetch(SEASONS_URL + id)

/**
 * Get all seasons
 * 
 * @use async/await
 * @use fetch
 */
export const getAllSeasons = async () => await fetch(SEASONS_URL)
