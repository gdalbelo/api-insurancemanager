import insurerService from "../services/insurer.service.js";

async function createInsurerController(req, res) {
  const { name, address, contactInfo, user } = req.body;
  const userId = req.userId;

  try {
    const post = await insurerService.createInsurerService(
      { name, address, contactInfo, user },
      userId
    );
    return res.status(201).send(post);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function findAllInsurersController(req, res) {
  const { limit, offset } = req.query;
  const currentUrl = req.baseUrl;

  try {
    const posts = await insurerService.findAllInsurersService(
      limit,
      offset,
      currentUrl
    );
    return res.send(posts);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function topNewsController(req, res) {
  try {
    const post = await insurerService.topNewsService();
    return res.send(post);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function searchInsuranceController(req, res) {
  const { title } = req.query;

  try {
    const foundPosts = await insurerService.searchPostService(title);

    return res.send(foundPosts);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function findInsurerByIdController(req, res) {
  const { id } = req.params;

  try {
    const post = await insurerService.findPostByIdService(id);
    return res.send(post);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

async function findInsurerByUserIdController(req, res) {
  const id = req.userId;
  try {
    const insurances = await insurerService.findInsurancesByUserIdService(id);
    return res.send(insurances);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function updateInsurerController(req, res) {
  const { name, address, contactInfo, user } = req.body;
  const { id } = req.params;
  const userId = req.userId;

  try {
    await insurerService.updateInsuranceService(name, address, contactInfo, user, userId);

    return res.send({ message: "Insurance successfully updated!" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function deleteInsurerController(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    await insurerService.deleteInsuranceService(id, userId);
    return res.send({ message: "Insurance deleted successfully" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

async function likeInsurerController(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const response = await insurerService.likeInsuranceService(id, userId);

    return res.send(response);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function commentInsurerController(req, res) {
  const { id: postId } = req.params;
  const { message } = req.body;
  const userId = req.userId;

  try {
    await insurerService.commentInsuranceService(postId, message, userId);

    return res.send({
      message: "Comment successfully completed!",
    });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function commentDeleteInsurerController(req, res) {
  const { id: postId, idComment } = req.params;
  const userId = req.userId;

  try {
    await insurerService.commentDeleteInsuranceService(postId, userId, idComment);

    return res.send({ message: "Insurance successfully removed" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

export default {
  createInsurerController,
  findAllInsurersController,
  topNewsController,
  searchInsuranceController,
  findInsurerByIdController,
  findInsurerByUserIdController,
  updateInsurerController,
  deleteInsurerController,
  likeInsurerController,
  commentInsurerController,
  commentDeleteInsurerController,
};
