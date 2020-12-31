/**
 * Buses API
 * 
 */
const BUSES_URL = "http://localhost:5000/api/buses/";

/**
 * Get bus by id
 * 
 * @use fetch/async/await
 * 
 * @param {integer} id for sql query
 */
export const getBus = async (id) => await fetch(BUSES_URL + id)

/**
 * Buses API function
 * 
 * @api get /api/buses/?page=2&limit=3
 * @use await/fetch
 * @param {integer} page offset sql query param (calculated on server)
 * @param {integer} limit limit sql query param (const)
 */
export const getAllBuses = async (page=0,limit=2) => await fetch(BUSES_URL.slice(0, -1) + '?page=' + page + '&limit=' + limit)

/**
 * Get buses count
 * 
 * @use fetch/async
 */
export const getBusesCount = async () => await fetch(BUSES_URL + 'count')


/**
 * Get bus's stations
 * 
 * @use fetch/async
 * 
 * @param {integer} id 
 * @param {integer} day_id 
 * @param {integer} season_id 
 */
export const getBusStations = async (id, day_id, season_id) => await fetch(BUSES_URL + id + "/day/" + day_id + "/season/" + season_id)