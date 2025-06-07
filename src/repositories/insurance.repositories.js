import InsurancePolicy from "../models/Insurance.js";

function createInsurancePolicyRepository(policyNumber, type, coverage, premium, insuredAmount, insurer, userId) {
  return InsurancePolicy.create({ policyNumber, type, coverage, premium, insuredAmount, insurer, user: userId });
}

function findAllInsurancePolicysRepository(offset, limit) {
  return InsurancePolicy.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit);
}

function topNewsRepository() {
  return InsurancePolicy.findOne().sort({ _id: -1 });
}

function findInsurancePolicyByIdRepository(id) {
  return InsurancePolicy.findById(id);
}

function countInsurancePolicys() {
  return InsurancePolicy.countDocuments();
}

function searchInsurancePolicyRepository(title) {
  return InsurancePolicy.find({
    title: { $regex: `${title || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");
}

function findInsurancePolicysByUserIdRepository(id) {
  return InsurancePolicy.find({
    user: id,
  })
    .sort({ _id: -1 })
    .populate("user");
}

function updateInsurancePolicyRepository(id, policyNumber, type, coverage, premium, insuredAmount, insurer) {
  return InsurancePolicy.findOneAndUpdate(
    {
      _id: id,
    },
    {
      policyNumber,
      type,
      coverage,
      premium,
      insuredAmount,
      insurer
    },
    {
      rawResult: true,
    }
  );
}

function deleteInsurancePolicyRepository(id) {
  return InsurancePolicy.findOneAndDelete({ _id: id });
}

function likesRepository(id, userId) {
  return InsurancePolicy.findOneAndUpdate(
    {
      _id: id,
      "likes.userId": { $nin: [userId] },
    },
    {
      $push: {
        likes: { userId, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );
}

function likesDeleteRepository(id, userId) {
  return InsurancePolicy.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $pull: {
        likes: {
          userId: userId,
        },
      },
    }
  );
}

function commentsRepository(id, message, userId) {
  let idComment = Math.floor(Date.now() * Math.random()).toString(36);
  return InsurancePolicy.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $push: {
        comments: { idComment, userId, message, createdAt: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );
}

function commentsDeleteRepository(id, userId, idComment) {
  return InsurancePolicy.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $pull: {
        comments: {
          idComment: idComment,
          userId: userId,
        },
      },
    }
  );
}

export default {
  createInsurancePolicyRepository,
  findAllInsurancePolicysRepository,
  topNewsRepository,
  findInsurancePolicyByIdRepository,
  searchInsurancePolicyRepository,
  findInsurancePolicysByUserIdRepository,
  updateInsurancePolicyRepository,
  deleteInsurancePolicyRepository,
  likesRepository,
  likesDeleteRepository,
  commentsRepository,
  commentsDeleteRepository,
  countInsurancePolicys,
};
