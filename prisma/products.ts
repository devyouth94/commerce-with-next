import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const productData: Prisma.productsCreateInput[] = Array.apply(null, Array(100)).map((_, idx) => ({
  name: `Dark Jean ${idx + 1}`,
  contents:
    '{"blocks":[{"key":"d7k1d","text":"this is a dark Jean!!","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":15,"length":6,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
  category_id: (idx + 1) % 5 === 0 ? 5 : (idx + 1) % 5,
  image_url: `https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/${
    (idx + 1) % 10 === 0 ? 10 : (idx + 1) % 10
  }.jpg`,
  price: Math.floor(Math.random() * (100000 - 20000) + 20000),
}));

const main = async () => {
  await prisma.products.deleteMany({});

  for (const p of productData) {
    const product = await prisma.products.create({
      data: p,
    });
    console.log(`Create ID: ${product.id}`);
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
