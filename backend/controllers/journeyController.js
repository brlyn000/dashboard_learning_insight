import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDeveloperJourneyCompletions = async(req,res) => {
    try {
        const response = await prisma.developer_journey_completions.findMany({
            where: {
                user_id: req.userId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                journey: {
                    select: {
                        id: true,
                        name: true,
                        difficulty: true,
                        point: true
                    }
                }
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}