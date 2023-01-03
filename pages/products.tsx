import Image from 'next/legacy/image';
import Carousel from 'nuka-carousel/lib/carousel';
import { useState } from 'react';

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

const Products = () => {
  const [index, setIndex] = useState(0);

  return (
    <>
      <Carousel autoplay withoutControls wrapAround slideIndex={index}>
        {images.map((image) => (
          <Image
            key={image.original}
            src={image.original}
            alt={image.original}
            width={1000}
            height={600}
            layout="responsive"
          />
        ))}
      </Carousel>
      <div>
        {images.map((image, idx) => (
          <Image
            onClick={() => setIndex(idx)}
            key={idx}
            src={image.original}
            alt={image.original}
            width={100}
            height={60}
          />
        ))}
      </div>
    </>
  );
};

export default Products;
