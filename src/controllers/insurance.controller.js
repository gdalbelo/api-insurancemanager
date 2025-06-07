import insuranceService from "../services/insurance.service.js";

async function createInsuranceController(req, res) {
  const { policyNumber, type, coverage, premium, insuredAmount, insurer } = req.body;
  const userId = req.userId;

  try {
    const post = await insuranceService.createInsuranceService(
      { policyNumber, type, coverage, premium, insuredAmount, insurer },
      userId
    );
    return res.status(201).send(post);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function findAllInsurancesController(req, res) {
  const { limit, offset } = req.query;
  const currentUrl = req.baseUrl;

  try {
    const insurances = await insuranceService.findAllInsurancesService(
      limit,
      offset,
      currentUrl
    );
    return res.send(insurances);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function searchInsuranceController(req, res) {
  const { title } = req.query;

  try {
    const foundPosts = await insuranceService.searchPostService(title);

    return res.send(foundPosts);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function findInsuranceByIdController(req, res) {
  const { id } = req.params;

  try {
    const insurance = await insuranceService.findInsuranceByIdService(id);
    return res.send(insurance);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

async function findInsurancesByUserIdController(req, res) {
  const id = req.userId;
  try {
    const insurances = await insuranceService.findInsurancesByUserIdService(id);
    return res.send(insurances);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function updateInsuranceController(req, res) {
  const { policyNumber, type, coverage, premium, insuredAmount, insurer } = req.body;
  const { id } = req.params;
  const userId = req.userId;

  try {
    await insuranceService.updateInsuranceService(policyNumber, type, coverage, premium, insuredAmount, insurer, id);

    return res.send({ message: "Insurance successfully updated!" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function deleteInsuranceController(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    await insuranceService.deleteInsuranceService(id, userId);
    return res.send({ message: "Insurance deleted successfully" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

async function likeInsuranceController(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const response = await insuranceService.likeInsuranceService(id, userId);

    return res.send(response);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function commentInsuranceController(req, res) {
  const { id: postId } = req.params;
  const { message } = req.body;
  const userId = req.userId;

  try {
    await insuranceService.commentInsuranceService(postId, message, userId);

    return res.send({
      message: "Comment successfully completed!",
    });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function commentDeleteInsuranceController(req, res) {
  const { id: postId, idComment } = req.params;
  const userId = req.userId;

  try {
    await insuranceService.commentDeleteInsuranceService(postId, userId, idComment);

    return res.send({ message: "Insurance successfully removed" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

export default {
  createInsuranceController,
  findAllInsurancesController,
  searchInsuranceController,
  findInsuranceByIdController,
  findInsurancesByUserIdController,
  updateInsuranceController,
  deleteInsuranceController,
  likeInsuranceController,
  commentInsuranceController,
  commentDeleteInsuranceController,
};
