"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ error: 'Token not provided' });
        return;
    }
    next();
};
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map