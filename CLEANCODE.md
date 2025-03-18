# arquivo: news-controller.ts
- if (isNaN(id) || id <= 0) <Ln 15, 32,44> -> (DRY)

- return res.status(httpStatus.BAD_REQUEST).send("Id is not valid."); <Ln 16, 33, 45> -> Magic String (Semântica)

# arquivo: error-handler.ts
- errorHandlingMiddleware() -> Complexidade de lógica booleana.

# arquivo: news-repositories.ts
- getNoticias() -> mistura português e inglês (Nomeação)
- getNoticiaById() -> mistura português e inglês (Nomeação)
- createNoticia() -> mistura português e inglês (Nomeação)
- updateNoticia() -> mistura português e inglês (Nomeação)
- removeNoticia() -> mistura português e inglês (Nomeação)

# arquivo: news-service.ts
- if (newsData.text.length < 500) <Ln 54> -> Magic number (Semântica)

- if (publicationDate.getTime() < currentDate.getTime()) <Ln 64> -> Validação booleano (Semântica)

- validate() -> (Tamanho de função)
