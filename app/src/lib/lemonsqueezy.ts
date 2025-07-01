import axios from 'axios';

export async function initiateCheckout(itemId: number, price: number) {
  try {
    const response = await axios.post(
      'https://api.lemonsqueezy.com/v1/checkouts',
      {
        data: {
          type: 'checkouts',
          attributes: {
            product_id: process.env.LEMONSQUEEZY_PRODUCT_ID,
            price,
            custom_data: { itemId },
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
        },
      }
    );
    return response.data.data.attributes.url;
  } catch (error) {
    throw new Error('Failed to initiate checkout');
  }
}