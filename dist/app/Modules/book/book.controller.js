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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../share/catchAsync"));
const pick_1 = __importDefault(require("../../../share/pick"));
const sendResponse_1 = require("../../../share/sendResponse");
// import { studentFilterableFields } from './student.constant'
// import { IProduct } from './student.interface'
const book_constant_1 = require("./book.constant");
const book_service_1 = require("./book.service");
const getAllProducts = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const paginationoptions = (0, pick_1.default)(
      req.query,
      pagination_1.paginationField
    );
    const filters = (0, pick_1.default)(
      req.query,
      book_constant_1.bookFilterableFields
    );
    const allProducts = yield book_service_1.ProductService.getAllProducts(
      paginationoptions,
      filters
    );
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      message: "all students fetched successfully",
      result: allProducts.data,
      meta: allProducts.meta,
    });
  })
);
// // get single semester
const getSingleProduct = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield book_service_1.ProductService.getSingleProduct(id);
    (0, sendResponse_1.sendResponse)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: "Product retrieved successfully !",
      result: result,
    });
  })
);
// update semester
const updateProduct = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield book_service_1.ProductService.updateProduct(
      id,
      updatedData
    );
    (0, sendResponse_1.sendResponse)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: "update semester successfully !",
      result: result,
    });
  })
);
// // delete semester
const deleteProduct = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield book_service_1.ProductService.deleteProduct(id);
    (0, sendResponse_1.sendResponse)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: "Product deleted successfully !",
      result: result,
    });
  })
);
exports.bookController = {
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
