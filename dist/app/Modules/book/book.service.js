"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
// import ApiError from '../../../errors/ApiError'
const paginationHelper_1 = require("../../../helper/paginationHelper");
const book_constant_1 = require("./book.constant");
const book_model_1 = require("./book.model");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const creatProductCollection = (book) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield book_model_1.Product.create(book);
  });
const getAllProducts = (paginationoptions, filters) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const {
      page = 1,
      limit = 10,
      skip,
      sortBy,
      sortOrder,
    } = paginationHelper_1.paginationHelpers.calculatePagination(
      paginationoptions
    );
    const { searchTerm } = filters,
      filtersData = __rest(
        filters,
        // search condition
        ["searchTerm"]
      );
    // search condition
    const andConditions = [];
    if (searchTerm) {
      andConditions.push({
        $or: book_constant_1.bookSearchableFields.map((field) => ({
          [field]: {
            $regex: searchTerm,
            $options: "i",
          },
        })),
      });
    }
    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
    // all conditions
    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield book_model_1.Product.find(whereConditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    const total = yield book_model_1.Product.countDocuments();
    return {
      meta: {
        page,
        limit,
        total: total,
      },
      data: result,
    };
  });
// get single semster
const getSingleProduct = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Product.findOne({ id });
    return result;
  });
// update student
const updateProduct = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const existProduct = yield book_model_1.Product.findOne({ id: id });
    console.log(existProduct, "exist");
    if (!existProduct) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        "Product not found"
      );
    }
    const updateProductData = Object.assign({}, payload);
    // local guardian
    const result = yield book_model_1.Product.findOneAndUpdate(
      { id },
      updateProductData,
      {
        new: true,
      }
    );
    return result;
  });
// // delete book
const deleteProduct = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const existProduct = book_model_1.Product.findOne({ id });
    if (!existProduct) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        "Product not found"
      );
    }
    const deletedProduct = yield book_model_1.Product.findOneAndDelete(
      { id },
      { new: true }
    );
    return deletedProduct;
  });
exports.ProductService = {
  getAllProducts,
  creatProductCollection,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
