import { useRouter } from 'next/router';
import Image from 'next/legacy/image';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Carousel from 'nuka-carousel/lib/carousel';
import { convertFromRaw } from 'draft-js';
import { EditorState } from 'draft-js';

import CustomEditor from 'components/Editor';

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

const Product = () => {
  const router = useRouter();
  const { id: productId } = router.query;

  const [index, setIndex] = useState(0);
  const [editorState, setEditorState] = useState<EditorState | undefined>(undefined);

  useEffect(() => {
    if (productId) {
      fetch(`/api/get-product?id=${productId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.items.contents) {
            setEditorState(
              EditorState.createWithContent(convertFromRaw(JSON.parse(data.items.contents))),
            );
          } else {
            setEditorState(EditorState.createEmpty());
          }
        });
    }
  }, [productId]);

  return (
    <>
      <Head>
        <meta
          property="og:url"
          content="http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html"
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="When Great Minds Don’t Think Alike" />
        <meta
          property="og:description"
          content="How much does culture influence creative thinking?"
        />
        <meta
          property="og:image"
          content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg"
        />
      </Head>

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

      {editorState && <CustomEditor editorState={editorState} readOnly />}
    </>
  );
};

export default Product;
