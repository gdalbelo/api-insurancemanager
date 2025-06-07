import Insurer from "../models/Insurer.js";

function createInsurerRepository(name, address, contactInfo, userId) {
  return Insurer.create({ name, address, contactInfo, user: userId });
}

function findAllInsurersRepository(offset, limit) {
  return Insurer.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("user");
}

function topNewsRepository() {
  return Insurer.findOne().sort({ _id: -1 }).populate("user");
}

function findInsurerByIdRepository(id) {
  return Insurer.findById(id);
}

function countInsurers() {
  return Insurer.countDocuments();
}

function searchInsurerRepository(title) {
  return Insurer.find({
    title: { $regex: `${title || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");
}

function findInsurersByUserIdRepository(id) {
  return Insurer.find({
    user: id,
  })
    .sort({ _id: -1 })
    .populate("user");
}

function updateInsurerRepository(id, name, address, contactInfo) {
  return Insurer.findOneAndUpdate(
    {
      _id: id,
    },
    {
      name,
      address,
      contactInfo,
    },
    {
      rawResult: true,
    }
  );
}

function deleteInsurerRepository(id) {
  return Insurer.findOneAndDelete({ _id: id });
}

function likesRepository(id, userId) {
  return Insurer.findOneAndUpdate(
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
  return Insurer.findOneAndUpdate(
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
  return Insurer.findOneAndUpdate(
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
  return Insurer.findOneAndUpdate(
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
  createInsurerRepository,
  findAllInsurersRepository,
  topNewsRepository,
  findInsurerByIdRepository,
  searchInsurerRepository,
  findInsurersByUserIdRepository,
  updateInsurerRepository,
  deleteInsurerRepository,
  likesRepository,
  likesDeleteRepository,
  commentsRepository,
  commentsDeleteRepository,
  countInsurers,
};
