import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "./../services/news-service";

import { AlterNewsData, CreateNewsData } from "../repositories/news-repository";

export async function getNews(req: Request, res: Response) {
  const page = Number(req.query.page) || 1;
  const order = String(req.query.order);
  const title = req.query.title ? String(req.query.title) : undefined;  // Se não houver title, não filtrar


  if(page<0 || !(page%2===0 || page%2===1)){
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  const news = await service.getNews(page, order, title);
  return res.send(news);
}

export async function getSpecificNews(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  checkId(id)

  const news = await service.getSpecificNews(id);
  return res.send(news);
}

export async function createNews(req: Request, res: Response) {
  const newsData = req.body as CreateNewsData;
  const createdNews = await service.createNews(newsData);

  return res.status(httpStatus.CREATED).send(createdNews);
}

export async function alterNews(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  checkId(id)

  const newsData = req.body as AlterNewsData;
  const alteredNews = await service.alterNews(id, newsData);

  return res.send(alteredNews);
}

export async function deleteNews(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  checkId(id)

  await service.deleteNews(id);
  return res.sendStatus(httpStatus.NO_CONTENT);
}

function checkId(id: number) {
  if (isNaN(id) || id <= 0) {
    throw {
      name: "BadRequest",
      message: `Id is not valid.`
    }
  }
}