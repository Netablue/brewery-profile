import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  // Clear the table before seeding
  await prisma.brewery.deleteMany();

  await prisma.brewery.createMany({
    data: [
      {
        id: 1,
        name: "Tete de Mule",
        description: "Créée en 2014, notre brasserie artisanale se situe à Coulon au coeur du Marais Poitevin dans un environnement naturel et préservé.    Nous avons implanté nos cuves de brassage dans une ancienne laiterie, un ancien site industriel réhabilité par le Parc régional du Marais Poitevin."
      },
      {
        id: 2,
        name: "Mont Blanc",
        description: "Produits de qualité inspirés par les Alpes françaises."
      },
      {
        id: 3,
        name: "Cimes",
        description: "Une expérience unique de bière dans les montagnes."
      },
    ],
  });

  // Success message
  console.log("Seed data successfully inserted into the brewery table!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
