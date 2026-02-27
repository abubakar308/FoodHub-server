export function notFound(req, res) {
    res.status(404).json({
        message: "This route is not available!!",
        path: req.originalUrl,
        date: Date()
    });
}
//# sourceMappingURL=notFound.js.map