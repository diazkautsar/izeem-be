import { FastifyInstance } from 'fastify';
import { SLUG_PERSONAL_INFORMATION } from '../constants';
import Users from '../entities/users.entity';

type GetUserPersonalInformationService = (
    this: FastifyInstance,
    payload: {
        userId: string | number;
    }
) => Promise<{ success: boolean; message: string; statusCode: number; data: any }>;

const getUserPersonalInformationService: GetUserPersonalInformationService = async function ({ userId }) {
    try {
        const user = await this.ORM.em.findOne(Users, { id: Number(userId) });
        if (!user) {
            return {
                success: false,
                message: 'user not found',
                statusCode: 404,
                data: user,
            };
        }

        const connection = this.ORM.em.getConnection();
        const fields = await connection.execute(
            `select * from fields f
            left join user_fields uf on uf.field_id = f.id
            where uf.user_id = ${Number(userId)} and f.slug in (?) order by uf.order asc`,
            [SLUG_PERSONAL_INFORMATION]
        );

        return {
            success: true,
            message: 'success get user personal information',
            statusCode: 200,
            data: {
                ...user,
                fields,
            },
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default getUserPersonalInformationService;
