import { Prisma } from "@prisma/client";

export async function generateBanner(websiteId: number, title: string) {
  const bannerUrl = 'https://s3.amazonaws.com/example/generated-banner.jpg';
  const banner = await Prisma.Banner.create({
    data: { websiteId, url: bannerUrl, title },
  });
  return banner;
}