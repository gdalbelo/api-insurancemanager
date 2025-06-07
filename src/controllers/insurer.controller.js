import insurerService from "../services/insurer.service.js";

async function createInsurerController(req, res) {
  const { name, address, contactInfo } = req.body;
  const userId = req.userId;

  try {
    const insurer = await insurerService.createInsurerService(
      { name, address, contactInfo },
      userId
    );
    return res.status(201).send(insurer);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function findAllInsurersController(req, res) {
  const { limit, offset } = req.query;
  const currentUrl = req.baseUrl;

  try {
    const insurers = await insurerService.findAllInsurersService(
      limit,
      offset,
      currentUrl
    );
    return res.send(insurers);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function topNewsController(req, res) {
  try {
    const insurer = await insurerService.topNewsService();
    return res.send(insurer);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function searchInsurerController(req, res) {
  const { title } = req.query;

  try {
    const foundInsurers = await insurerService.searchInsurerService(title);

    return res.send(foundInsurers);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function findInsurerByIdController(req, res) {
  const { id } = req.params;

  try {
    const insurer = await insurerService.findInsurerByIdService(id);
    return res.send(insurer);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

async function findInsurerByUserIdController(req, res) {
  const id = req.userId;
  try {
    const insurers = await insurerService.findInsurersByUserIdService(id);
    return res.send(insurers);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function updateInsurerController(req, res) {
  const { name, address, contactInfo } = req.body;
  const { id } = req.params;
  const userId = req.userId;

  try {
    await insurerService.updateInsurerService(id, name, address, contactInfo, userId);

    return res.send({ message: "Insurer successfully updated!" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function deleteInsurerController(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    await insurerService.deleteInsurerService(id, userId);
    return res.send({ message: "Insurer deleted successfully" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

async function likeInsurerController(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const response = await insurerService.likeInsurerService(id, userId);

    return res.send(response);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function commentInsurerController(req, res) {
  const { id: insurerId } = req.params;
  const { message } = req.body;
  const userId = req.userId;

  try {
    await insurerService.commentInsurerService(insurerId, message, userId);

    return res.send({
      message: "Comment successfully completed!",
    });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function commentDeleteInsurerController(req, res) {
  const { id: insurerId, idComment } = req.params;
  const userId = req.userId;

  try {
    await insurerService.commentDeleteInsurerService(insurerId, userId, idComment);

    return res.send({ message: "Comment successfully removed" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

export default {
  createInsurerController,
  findAllInsurersController,
  topNewsController,
  searchInsurerController,
  findInsurerByIdController,
  findInsurerByUserIdController,
  updateInsurerController,
  deleteInsurerController,
  likeInsurerController,
  commentInsurerController,
  commentDeleteInsurerController,
};
