import { prisma } from "../../lib/prisma";

const createPost = async (data: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'authorId'>, userId: string) => {
    const result = await prisma.provider.create({
        data: {
            ...data,
            authorId: userId
        }
    })
    return result;
}

export const postService = {
    createPost
}