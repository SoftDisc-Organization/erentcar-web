import http from "./http-common"

class PaymentsService {
  private BASE_URL = "payments/"

  createPaymentIntent(data: any) {
    return http.post(this.BASE_URL + "create-payment-intent", data);
  }
}

export default new PaymentsService();