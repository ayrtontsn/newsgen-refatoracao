import prisma from "../database";
import * as newsRepository from "../repositories/news-repository";
import { AlterNewsData, CreateNewsData } from "../repositories/news-repository";

export async function getNews() {
  return newsRepository.getNews();
}

export async function getSpecificNews(id: number) {
  const news = await newsRepository.getNewById(id);
  if (!news) {
    throw {
      name: "NotFound",
      message: `News with id ${id} not found.`
    }
  }

  return news;
}

export async function createNews(newsData: CreateNewsData) {
  await validate(newsData);
  return newsRepository.createNew(newsData);
}

export async function alterNews(id: number, newsData: AlterNewsData) {
  const news = await getSpecificNews(id);
  await validate(newsData, news.title !== newsData.title);

  return newsRepository.updateNew(id, newsData);
}

export async function deleteNews(id: number) {
  await getSpecificNews(id);
  return newsRepository.removeNew(id);
}

async function validate(newsData: CreateNewsData, isNew = true) {
  console.log(newsData)
  // validate if news with specific text already exists
  if (isNew) {
    const newsWithTitle = await prisma.news.findFirst({
      where: { title: newsData.title }
    });

    if (newsWithTitle) {
      throw {
        name: "Conflict",
        message: `News with title ${newsData.title} already exist`
      }
    }
  }
  checkTextLength(newsData.text)
  checkPublicationDate(newsData.publicationDate)
}

function checkTextLength(text:string) {
  const MAX_LENGTH = 500
  // checks news text length
  if (text.length < MAX_LENGTH) {
    throw {
      name: "BadRequest",
      message: "The news text must be at least 500 characters long.",
    };
  }
}


function checkPublicationDate(publicationDate: Date) {
    // checks date
      // checks date
  const currentDate = new Date();
  publicationDate = new Date(publicationDate)

  const isPastPublication = publicationDate.getTime() < currentDate.getTime()
  if (isPastPublication) {
    throw {
      name: "BadRequest",
      message: "The publication date cannot be in the past.",
    };
  }
}
