"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
router.post('/signup', middleware_1.authMiddleware, (req, res) => {
    console.log('signup handler');
});
router.post('/signin', middleware_1.authMiddleware, (req, res) => {
    console.log('sigin handler');
});
router.get('/', middleware_1.authMiddleware, (req, res) => {
    console.log('user handler');
});
exports.userRouter = router;
