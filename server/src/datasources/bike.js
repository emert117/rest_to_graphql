const {RESTDataSource} = require('apollo-datasource-rest');

class BikeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://kovan-dummy-api.herokuapp.com/';
  }

  async getAllBikes() {
    const response = await this.get('items');
    return Array.isArray(response.data.bikes)
      ? response.data.bikes.filter(b => b != null && b.bike_id)
          .map(bike => this.bikeReducer(bike))
      : [];
  }

  async getBikeById({ bike_id }) {
    const response = await this.get('items', { bike_id: bike_id });
    return this.bikeReducer(response.data.bike);
  }

  bikeReducer(bike) {
    return {
      bike_id: bike.bike_id,
      vehicle_type: bike.vehicle_type,
      lat: bike.lat,
      lon: bike.lon,
      is_reserved: bike.is_reserved === true,
      is_disabled: bike.is_disabled === true,
      total_bookings: bike.total_bookings,
      android: bike.android,
      ios: bike.ios,
    };
  }
}

module.exports = BikeAPI;