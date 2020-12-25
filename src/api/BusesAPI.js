/**
 * Buses API
 * 
 */
const BUSES_URL = "http://localhost:5000/api/buses/";

/**
 * Get bus by id
 * 
 * @use async/await
 * @use fetch
 * 
 * @param {integer} id 
 */
export const getBus = async (id) => await fetch(BUSES_URL + id)

/**
 * Get all buses
 * 
 * @use async/await
 * @use fetch
 */
export const getAllBuses = async (page=0,limit=2) => await fetch(BUSES_URL.slice(0, -1) + '?page=' + page + '&limit=' + limit)

/**
 * Get buses count
 * 
 * @use async/await
 * @use fetch
 */
export const getBusesCount = async () => await fetch(BUSES_URL + 'count')


/**
 * Get bus's stations
 * 
 * @use async/await
 * @use fetch
 * 
 * @param {integer} id 
 * @param {integer} day_id 
 * @param {integer} season_id 
 */
export const getBusStations = async (id, day_id, season_id) => await fetch(BUSES_URL + id + "/day/" + day_id + "/season/" + season_id)