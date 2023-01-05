import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from 'styles/Home.module.css';
import { useRef, useState, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export type Product = {
  id: number;
  name: string;
  contents: string | null;
  createdAt: string;
};

export default function Home() {
  const [product, setProduct] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/get-products')
      .then((res) => res.json())
      .then((data) => setProduct(data.items));
  }, []);

  const handleClick = () => {
    if (inputRef.current === null || inputRef.current.value === '') {
      alert('이름을 입력해주세요');
      return;
    }

    fetch(`api/add-item?name=${inputRef.current.value}`)
      .then((res) => res.json())
      .then((data) => alert(data.message));
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          {product?.map((item) => (
            <div key={item.id}>
              {item.name} {item.createdAt}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
