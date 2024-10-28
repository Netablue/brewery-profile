// controllers/userController.ts
import { PrismaClient, User, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsers(): Promise<User[]> {
    try {
        return await prisma.user.findMany();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

export async function getUserById(id: number): Promise<User | null> {
    try {
        return await prisma.user.findUnique({
            where: { id }
        });
    } catch (error) {
        console.error(`Error fetching user with id ${id}:`, error);
        throw error;
    }
}

export async function createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
        return await prisma.user.create({
            data
        });
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export async function updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    try {
        return await prisma.user.update({
            where: { id },
            data
        });
    } catch (error) {
        console.error(`Error updating user with id ${id}:`, error);
        throw error;
    }
}

export async function deleteUser(id: number): Promise<User> {
    try {
        return await prisma.user.delete({
            where: { id }
        });
    } catch (error) {
        console.error(`Error deleting user with id ${id}:`, error);
        throw error;
    }
}
