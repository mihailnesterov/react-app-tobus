/**
 * Routes API
 * 
 */
const ROUTES_URL = "http://localhost:5000/api/routes/";

/**
 * Get routes ordered by hours and minutes
 * 
 * @use async/await
 * @use fetch
 * 
 * @param {integer} bus_id 
 * @param {integer} station_id 
 * @param {integer} season_id 
 * @param {integer} day_id
 */
export const getRoutes = async (bus_id, station_id, season_id, day_id) => await fetch(ROUTES_URL + bus_id + "/station/" + station_id + "/season/" + season_id + "/day/" + day_id)
