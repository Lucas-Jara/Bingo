import MercadoPagoConfig, { Preference } from "mercadopago";
import { NextRequest } from "next/server";


const client = new MercadoPagoConfig({
    accessToken:
      process.env.NEXT_PUBLIC_MP_ACCESSS_TOKEN || "",
  });
  export async function POST(request: NextRequest) {
    const body = await request.json().then((data) => data as { amount: string });
    
    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: new Date().toISOString(),
            title: "Donación",
            quantity: 1,
            unit_price: 0 || Number(body.amount),
          },
        ],
        purpose: 'wallet_purchase',
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_APP_URL}/donate`,
        },
      },
    });
  
    return Response.json({
        preference_id: preference.id
    })
  }
  