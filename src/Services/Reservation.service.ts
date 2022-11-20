import http from "./http-common";

class ReservationService{
    private BASE_URL = "reservations"

    getReservationsByToken() {
        return http.get(this.BASE_URL);
    }
}
export default new ReservationService()