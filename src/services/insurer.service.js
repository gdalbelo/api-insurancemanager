import insurerRepositories from "../repositories/Insurer.repositories.js";

async function createInsurerService({ name, address, contactInfo }, userId) {
  if (!name || !address || !contactInfo)
    throw new Error("Submit all fields for registration");

  const { id } = await insurerRepositories.createInsurerRepository(
    name, address, contactInfo, userId
  );

  return {
    message: "seguradora created successfully!",
    seguradora: { id, name, address, contactInfo }
  };
}

async function findAllInsurersService(limit, offset, currentUrl) {
  limit = Number(limit);
  offset = Number(offset);

  if (!limit) {
    limit = 5;
  }

  if (!offset) {
    offset = 0;
  }

  const seguradoras = await insurerRepositories.findAllInsurersRepository(offset, limit);

  const total = await insurerRepositories.countInsurers();

  const next = offset + limit;
  const nextUrl = ''; 
  // const nextUrl =
  //   next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

  const previous = offset - limit < 0 ? null : offset - limit;
  const previousUrl = '';
  // const previousUrl =
  //   previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

  //seguradoras.shift();

  return {
    nextUrl,
    previousUrl,
    limit,
    offset,
    total,

    results: seguradoras.map((seguradora) => ({
      id: seguradora._id,
      name: seguradora.name,
      address: seguradora.address,
      contactInfo: seguradora.contactInfo,
      user: seguradora.user
      // id: seguradora._id,
      // title: seguradora.title,
      // banner: seguradora.banner,
      // text: seguradora.text,
      // likes: seguradora.likes,
      // comments: seguradora.comments,
      // name: seguradora.user.name,
      // username: seguradora.user.username,
      // avatar: seguradora.user.avatar,
    })),
  };
}

async function topNewsService() {
  const seguradora = await insurerRepositories.topNewsRepository();

  if (!seguradora) throw new Error("There is no registered seguradora");

  return {
    seguradora: {
      id: seguradora._id,
      title: seguradora.title,
      banner: seguradora.banner,
      text: seguradora.text,
      likes: seguradora.likes,
      comments: seguradora.comments,
      name: seguradora.user.name,
      username: seguradora.user.username,
      avatar: seguradora.user.avatar,
    },
  };
}

async function searchInsurerService(title) {
  const foundseguradoras = await insurerRepositories.searchseguradoraRepository(title);

  if (foundseguradoras.length === 0)
    throw new Error("There are no seguradoras with this title");

  return {
    foundseguradoras: foundseguradoras.map((seguradora) => ({
      id: seguradora._id,
      title: seguradora.title,
      banner: seguradora.banner,
      text: seguradora.text,
      likes: seguradora.likes,
      comments: seguradora.comments,
      name: seguradora.user.name,
      username: seguradora.user.username,
      avatar: seguradora.user.avatar,
    })),
  };
}

async function findInsurerByIdService(id) {
  const seguradora = await insurerRepositories.findInsurerByIdRepository(id);

  if (!seguradora) throw new Error("Insurer not found");

  return {
    id: seguradora._id,
    name: seguradora.name,
    address: seguradora.address,
    contactInfo: seguradora.contactInfo,
    user: seguradora.user
  };
}

async function findInsurersByUserIdService(id) {
  const seguradoras = await insurerRepositories.findInsurersByUserIdRepository(id);

  return {
    seguradorasByUser: seguradoras.map((seguradora) => ({
      id: seguradora._id,
      title: seguradora.title,
      banner: seguradora.banner,
      text: seguradora.text,
      likes: seguradora.likes,
      comments: seguradora.comments,
      name: seguradora.user.name,
      username: seguradora.user.username,
      avatar: seguradora.user.avatar,
    })),
  };
}
async function updateInsurerService(id, name, address, contactInfo, userId) {
  if (!name && !address && !contactInfo)
    throw new Error("Submit at least one field to update the seguradora");

  const seguradora = await insurerRepositories.findInsurerByIdRepository(id);

  if (!seguradora) throw new Error("Insurer not found");

  //if (seguradora.user._id != userId) throw new Error("You didn't create this seguradora");

  await insurerRepositories.updateInsurerRepository(id, name, address, contactInfo);
}

async function deleteInsurerService(id, userId) {
  const seguradora = await insurerRepositories.findInsurerByIdRepository(id);

  //if (!seguradora) throw new Error("Insurer not found");

  //if (seguradora.user._id != userId) throw new Error("You didn't create this seguradora");

  await insurerRepositories.deleteInsurerRepository(id);
}

async function likeInsurerService(id, userId) {
  const seguradoraLiked = await seguradoraService.likesService(id, userId);

  if (seguradoraLiked.lastErrorObject.n === 0) {
    await seguradoraService.likesDeleteService(id, userId);
    return { message: "Like successfully removed" };
  }

  return { message: "Like done successfully" };
}

async function commentInsurerService(seguradoraId, message, userId) {
  if (!message) throw new Error("Write a message to comment");

  const seguradora = await insurerRepositories.findInsurerByIdRepository(seguradoraId);

  if (!seguradora) throw new Error("Insurer not found");

  await insurerRepositories.commentsRepository(seguradoraId, message, userId);
}

async function commentDeleteInsurerService(seguradoraId, userId, idComment) {
  const seguradora = await insurerRepositories.findInsurerByIdRepository(seguradoraId);

  if (!seguradora) throw new Error("Insurer not found");

  await insurerRepositories.commentsDeleteRepository(seguradoraId, userId, idComment);
}

export default {
  createInsurerService,
  findAllInsurersService,
  topNewsService,
  searchInsurerService,
  findInsurerByIdService,
  findInsurersByUserIdService,
  updateInsurerService,
  deleteInsurerService,
  likeInsurerService,
  commentInsurerService,
  commentDeleteInsurerService,
};
