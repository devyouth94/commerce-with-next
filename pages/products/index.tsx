import { products } from '@prisma/client';
import Image from 'next/legacy/image';
import { useCallback, useEffect, useState } from 'react';

const TAKE = 9;

const Products = () => {
  const [skip, setSkip] = useState(0);
  const [products, setProducts] = useState<products[]>([]);

  useEffect(() => {
    fetch(`/api/get-products?skip=0&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.items));
  }, []);

  const getProducts = useCallback(() => {
    const next = skip + TAKE;
    fetch(`/api/get-products?skip=${next}&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => {
        const list = products.concat(data.items);
        setProducts(list);
      });
    setSkip(next);
  }, [products, skip]);

  return (
    <div className="px-36 mt-36 mb-36">
      <div className="grid grid-cols-3 gap-5">
        {products?.map((item) => (
          <div key={item.id}>
            <Image
              className="rounded"
              src={item.image_url || ''}
              alt={String(item.id)}
              layout="responsive"
              width={300}
              height={200}
            />
            <div className="flex justify-between">
              <span>{item.name}</span>
              <span>{item.price.toLocaleString('ko-KR')}원</span>
            </div>
            <span className="text-zinc-500">{item.category_id === 1 && '의류'}</span>
          </div>
        ))}
      </div>

      <button className="w-full rounded mt-20 bg-zinc-200 p-4" onClick={getProducts}>
        더보기
      </button>
    </div>
  );
};

export default Products;
