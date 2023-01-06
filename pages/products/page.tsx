import { categories, products } from '@prisma/client';
import Image from 'next/legacy/image';
import { useEffect, useState } from 'react';
import { Pagination, SegmentedControl } from '@mantine/core';
import { CATEGORY_MAP, TAKE } from 'constants/products';

const Products = () => {
  const [products, setProducts] = useState<products[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [categories, setCategories] = useState<categories[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('-1');
  const [activePage, setPage] = useState(1);

  useEffect(() => {
    fetch(`/api/get-categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data.items));
  }, []);

  useEffect(() => {
    fetch(`/api/get-products-count?category=${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => setTotalPage(Math.ceil(data.items / TAKE)));
  }, [selectedCategory]);

  useEffect(() => {
    const skip = TAKE * (activePage - 1);

    fetch(`/api/get-products?skip=${skip}&take=${TAKE}&category=${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.items));
  }, [activePage, selectedCategory]);

  return (
    <div className="px-36 mt-36 mb-36">
      <div className="w-full flex justify-center mb-5">
        <SegmentedControl
          value={selectedCategory}
          onChange={setSelectedCategory}
          data={[
            { label: 'All', value: '-1' },
            ...categories?.map((item) => ({ label: item.name, value: String(item.id) })),
          ]}
          color="dark"
        />
      </div>
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
            <span className="text-zinc-500">
              {CATEGORY_MAP[item.category_id ? item.category_id - 1 : 0]}
            </span>
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
