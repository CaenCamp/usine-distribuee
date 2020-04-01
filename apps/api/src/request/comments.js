const prepareCommentsForSave = (comments, user) => {
    return comments.map((comment, index) => {
        if (comment.id) {
            return comment;
        }
        const now = new Date();
        return {
            ...comment,
            id: index + 1,
            role: user.role,
            email: user.email,
            date: now.toISOString()
        };
    });
};

module.exports = {
    prepareCommentsForSave
};
