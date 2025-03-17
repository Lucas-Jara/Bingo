"use server";

import MercadoPagoConfig, { Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_MP_ACCESSS_TOKEN || "",
});

export const getPayment = async (paymentId: string) => {
  try {
    await new Payment(client).get({ id: paymentId });
    return true;
  } catch (error) {
    return false;
  }
};
