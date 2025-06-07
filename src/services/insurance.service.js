import InsuranceRepositories from "../repositories/Insurance.repositories.js";

async function createInsuranceService({ policyNumber, type, coverage, premium, insuredAmount, insurer }, userId) {
  if (!policyNumber || !type || !coverage || !premium || !insuredAmount || !insurer)
    throw new Error(`policyNumber: ${policyNumber}, type: ${type}, coverage: ${coverage}, premium: ${premium}, insuredAmount: ${insuredAmount}, insurer: ${insurer}` + "Submit all fields for registration");

  const { id } = await InsuranceRepositories.createInsurancePolicyRepository(
    policyNumber, 
    type, 
    coverage, 
    premium, 
    insuredAmount, 
    insurer
  );

  return {
    message: "Insurance created successfully!",
    insurance: { policyNumber, type, coverage, premium, insuredAmount, insurer },
  };
}

async function findAllInsurancesService(limit, offset, currentUrl) {
  limit = Number(limit);
  offset = Number(offset);

  if (!limit) {
    limit = 5;
  }

  if (!offset) {
    offset = 0;
  }

  const insuracers = await InsuranceRepositories.findAllInsurancePolicysRepository(offset, limit);

  const total = await InsuranceRepositories.countInsurancePolicys();

  const next = offset + limit;
  const nextUrl =
    next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

  const previous = offset - limit < 0 ? null : offset - limit;
  const previousUrl =
    previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

  //insuracers.shift();

  return {
    nextUrl,
    previousUrl,
    limit,
    offset,
    total,

    results: insuracers.map((insurance) => ({
      id: insurance._id,
      policyNumber: insurance.policyNumber,
      type: insurance.type,
      coverage: insurance.coverage,
      premium: insurance.premium,
      insuredAmount: insurance.insuredAmount,
      insurer: insurance.insurer
    })),
  };
}

async function topNewsService() {
  const insurancer = await InsuranceRepositories.topNewsRepository();

  if (!insurancer) throw new Error("There is no registered post");

  return {
    insurancer: {
      id: insurance._id,
      policyNumber: insurance.policyNumber,
      type: insurance.type,
      coverage: insurance.coverage,
      premium: insurance.premium,
      insuredAmount: insurance.insuredAmount,
      insurer: insurance.insurer
    },
  };
}

async function searchInsuranceService(title) {
  const foundInsurances = await InsuranceRepositories.searchInsuranceRepository(title);

  if (foundInsurances.length === 0)
    throw new Error("There are no insuracers with this title");

  return {
    foundInsurances: foundInsurances.map((post) => ({
      id: post._id,
      title: post.title,
      banner: post.banner,
      text: post.text,
      likes: post.likes,
      comments: post.comments,
      name: post.user.name,
      username: post.user.username,
      avatar: post.user.avatar,
    })),
  };
}

async function findInsuranceByIdService(id) {
  const insurance = await InsuranceRepositories.findInsurancePolicyByIdRepository(id);

  if (!insurance) throw new Error("Insurance not found");

  return {
  policyNumber: insurance.policyNumber,
  type: insurance.type,
  coverage: insurance.coverage,
  premium: insurance.premium,
  insuredAmount: insurance.insuredAmount,
  insurer: insurance.insurer
  };
}

async function findInsurancesByUserIdService(id) {
  const insuracers = await InsuranceRepositories.findInsurancesByUserIdRepository(id);

  return {
    insuracersByUser: insuracers.map((post) => ({
      id: post._id,
      title: post.title,
      banner: post.banner,
      text: post.text,
      likes: post.likes,
      comments: post.comments,
      name: post.user.name,
      username: post.user.username,
      avatar: post.user.avatar,
    })),
  };
}
async function updateInsuranceService(coverage, insuredAmount, insurer, policyNumber, premium, type, id) {
  if (!coverage && !insuredAmount && !insurer && !policyNumber && !premium && !type)
    throw new Error("Submit at least one field to update the post");

  const post = await InsuranceRepositories.findInsurancePolicyByIdRepository(id);

  if (!post) throw new Error("Insurance not found");

  //if (post.user._id != userId) throw new Error("You didn't create this post");

  await InsuranceRepositories.updateInsurancePolicyRepository(id, coverage, insuredAmount, insurer, policyNumber, premium, type);
}

async function deleteInsuranceService(id, userId) {
  const post = await InsuranceRepositories.findInsurancePolicyByIdRepository(id);

  if (!post) throw new Error("Insurance not found");

  //if (post.user._id != userId) throw new Error("You didn't create this post");

  await InsuranceRepositories.deleteInsurancePolicyRepository(id);
}

async function likeInsuranceService(id, userId) {
  const postLiked = await postService.likesService(id, userId);

  if (postLiked.lastErrorObject.n === 0) {
    await postService.likesDeleteService(id, userId);
    return { message: "Like successfully removed" };
  }

  return { message: "Like done successfully" };
}

async function commentInsuranceService(postId, message, userId) {
  if (!message) throw new Error("Write a message to comment");

  const post = await InsuranceRepositories.findInsurancePolicyByIdRepository(postId);

  if (!post) throw new Error("Insurance not found");

  await InsuranceRepositories.commentsRepository(postId, message, userId);
}

async function commentdeleteInsuranceService(postId, userId, idComment) {
  const post = await InsuranceRepositories.findInsurancePolicyByIdRepository(postId);

  if (!post) throw new Error("Insurance not found");

  await InsuranceRepositories.commentsDeleteRepository(postId, userId, idComment);
}

export default {
  createInsuranceService,
  findAllInsurancesService,
  topNewsService,
  searchInsuranceService,
  findInsuranceByIdService,
  findInsurancesByUserIdService,
  updateInsuranceService,
  deleteInsuranceService,
  likeInsuranceService,
  commentInsuranceService,
  commentdeleteInsuranceService,
};
