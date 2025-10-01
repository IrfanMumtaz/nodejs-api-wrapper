const prisma = require('@config/db');

class UserService {
    /**
     * Get all users
     * @returns {Promise<Array>} Array of users
     */
    static async getAll() {
        return await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    /**
     * Get user by ID
     * @param {number} id - User ID
     * @returns {Promise<Object|null>} User object or null
     */
    static async getById(id) {
        return await prisma.user.findUnique({
            where: { id: parseInt(id) }
        });
    }

    /**
     * Create a new user
     * @param {Object} userData - User data
     * @returns {Promise<Object>} Created user
     */
    static async create(userData) {
        return await prisma.user.create({
            data: userData
        });
    }

    /**
     * Update user by ID
     * @param {number} id - User ID
     * @param {Object} userData - Updated user data
     * @returns {Promise<Object>} Updated user
     */
    static async update(id, userData) {
        return await prisma.user.update({
            where: { id: parseInt(id) },
            data: userData
        });
    }

    /**
     * Delete user by ID
     * @param {number} id - User ID
     * @returns {Promise<Object>} Deleted user
     */
    static async delete(id) {
        return await prisma.user.delete({
            where: { id: parseInt(id) }
        });
    }
}

module.exports = UserService;
