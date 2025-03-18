import prisma from "./../database";
import { News } from "@prisma/client";

export type CreateNewsData = Omit<News, "id" | "createAt">;
export type AlterNewsData = CreateNewsData;

const PAGE_LIMIT = 10;

export function getNews(page: number, order: string, title: string) {
  const skipNews = (page - 1) * PAGE_LIMIT;

  return prisma.news.findMany({
    orderBy: {
      publicationDate: order === "asc" ? "asc" : "desc"
    },
    where: {
      title:{
        contains: title,
      }
    },
    skip: skipNews,
    take: PAGE_LIMIT
  });
}

export function getNewById(id: number) {
  return prisma.news.findUnique({
    where: { id }
  })
}

export async function createNew(newsData: CreateNewsData) {
  return prisma.news.create({
    data: { ...newsData, publicationDate: new Date(newsData.publicationDate) }
  });
}

export async function updateNew(id: number, news: AlterNewsData) {
  return prisma.news.update({
    where: { id },
    data: { ...news, publicationDate: new Date(news.publicationDate) }
  })
}

export async function removeNew(id: number) {
  return prisma.news.delete({
    where: { id }
  })
}