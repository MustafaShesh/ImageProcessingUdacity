"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sharp_1 = __importDefault(require("sharp"));
var path_1 = __importDefault(require("path"));
var routes = express_1.default.Router();
// define local directory for images
var importImages = './images/full';
var exportImages = './images/thumb';
// define a route handler for the image processing
routes.get('/images', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, width, height, imageName, thumbImageName, originalImgPath, thumbImgPath, result, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, width = _a.width, height = _a.height;
                imageName = req.query.filename;
                thumbImageName = "/".concat(imageName, "_").concat(width, "_").concat(height);
                originalImgPath = path_1.default.join(__dirname, ".".concat(importImages), "/".concat(imageName, ".jpg"));
                thumbImgPath = path_1.default.join(__dirname, ".".concat(exportImages), "".concat(thumbImageName, ".jpg"));
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                if (!(thumbImageName.thumbImgPath == thumbImgPath)) return [3 /*break*/, 2];
                res.sendFile(thumbImgPath);
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, (0, sharp_1.default)(originalImgPath)
                    .resize({ width: +width, height: +height })
                    .toFile(thumbImgPath)];
            case 3:
                result = _b.sent();
                res.sendFile(thumbImgPath);
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                // throw an error when any of the parameters is wrongly entered
                if (width <= 0 || height <= 0) {
                    console.log("Image parameters is wrong! Try positve value");
                    res.send("Image parameters is wrong! Try positve value");
                }
                else if (width == null || height == null || imageName == '') {
                    console.log("Image parameters is missing! Try entring the value");
                    res.send("Image parameters is missing! Try entring the value");
                }
                else {
                    console.log("There is no image names ".concat(imageName));
                    res.send("There is no image names ".concat(imageName));
                }
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.default = routes;
