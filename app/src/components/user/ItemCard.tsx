'use client';
import { useState } from 'react';
import FavoriteButton from './FavoriteButton';
import { initiateCheckout } from '../../lib/lemonsqueezy';

interface Item {
  id: number;
  name: string;
  description?: string;
  price: number;
  images: { url: string }[];
}

interface ItemCardProps {
  item: Item;
  userId?: string;
}

export default function ItemCard({ item, userId }: ItemCardProps) {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const checkoutUrl = await initiateCheckout(item.id, item.price);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Checkout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-4">
      {item.images[0] && <img src={item.images[0].url} alt={item.name} className="w-full h-48 object-cover" />}
      <h3 className="text-xl font-semibold">{item.name}</h3>
      <p className="text-gray-600">{item.description}</p>
      <p className="text-lg font-bold">${item.price}</p>
      {userId && <FavoriteButton itemId={item.id} userId={userId} />}
      <button
        onClick={handlePurchase}
        disabled={loading}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? 'Processing...' : 'Buy Now'}
      </button>
    </div>
  );
}