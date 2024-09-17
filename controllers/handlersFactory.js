const asyncHandler = require("express-async-handler");
const slugify = require('slugify');
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new ApiError(`No document with this id: ${id}`, 404));
    }
    res.status(204).json();
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      return next(new ApiError(`No document with this id: ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      return next(new ApiError(`No document with this id: ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });
exports.getAll = (Model , modelName ='') => asyncHandler(async (req, res) => {
    let filter = {}
    if(req.filterObj){
        filter = req.filterObj
    }
    //  Build query
    const countDocuments = await Model.countDocuments(filter);
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginate(countDocuments)
      .filter()
      .search(modelName)
      .limitFields()
      .sort();
  
    //  Execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await apiFeatures.mongooseQuery;
  
    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
  });