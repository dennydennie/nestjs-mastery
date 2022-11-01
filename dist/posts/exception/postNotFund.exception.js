"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class PostNotFoundException extends common_1.NotFoundException {
    constructor(postId) {
        super(`Post with id ${postId} can not be found`);
    }
}
exports.default = PostNotFoundException;
//# sourceMappingURL=postNotFund.exception.js.map