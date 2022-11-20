import http from "./http-common"

class FavouriteService {
    private BASE_URL = "favourites/"

    get() {
        return http.get(this.BASE_URL)
    }

    post(id: number) {
        return http.post(this.BASE_URL, { carId: id })
    }

    delete(id: number) {
        return http.delete(this.BASE_URL + id)
    }
}

export default new FavouriteService();