import { useRouter } from 'next/router';
import Image from 'next/legacy/image';
import { useEffect, useState } from 'react';
import Carousel from 'nuka-carousel/lib/carousel';
import { convertFromRaw, convertToRaw } from 'draft-js';
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

const Edit = () => {
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

  const handleSave = () => {
    if (editorState) {
      fetch(`/api/update-product`, {
        method: 'POST',
        body: JSON.stringify({
          id: productId,
          contents: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert('Success');
        });
    }
  };

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

      {editorState && (
        <CustomEditor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default Edit;
