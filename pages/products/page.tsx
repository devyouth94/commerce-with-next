import { products } from '@prisma/client';
import Image from 'next/legacy/image';
import { useCallback, useEffect, useState } from 'react';
import { Pagination } from '@mantine/core';

const TAKE = 9;

const Products = () => {
  const [products, setProducts] = useState<products[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [activePage, setPage] = useState(1);

  useEffect(() => {
    fetch(`/api/get-products-count`)
      .then((res) => res.json())
      .then((data) => setTotalPage(Math.ceil(data.items / TAKE)));

    fetch(`/api/get-products?skip=0&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.items));
  }, []);

  useEffect(() => {
    const skip = TAKE * (activePage - 1);

    fetch(`/api/get-products?skip=${skip}&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.items));
  }, [activePage]);

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
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII="
            />
            <div className="flex justify-between">
              <span>{item.name}</span>
              <span>{item.price.toLocaleString('ko-KR')}원</span>
            </div>
            <span className="text-zinc-500">{item.category_id === 1 && '의류'}</span>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center mt-5">
        <Pagination page={activePage} onChange={setPage} total={totalPage} />
      </div>
    </div>
  );
};

export default Products;
