/**
 * Stations API
 * 
 */
const STATIONS_URL = "http://localhost:5000/api/stations/";

/**
 * Get station by id
 * 
 * @use async/await
 * @use fetch
 * 
 * @param {integer} id 
 */
export const getStation = async (id) => await fetch(STATIONS_URL + id)

/**
 * Get all stations
 * 
 * @use async/await
 * @use fetch
 */
export const getAllStations = async () => await fetch(STATIONS_URL)
