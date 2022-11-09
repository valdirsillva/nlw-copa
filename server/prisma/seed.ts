import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Valdir Silva',
            email: 'valdirpiresba@gmail.com',
            avatarUrl: 'https://github.com/valdirsillva.png'
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Example pool',
            code: 'BolaCopa22',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-02T12:40:57.396Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-02T18:40:57.396Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',
            // Cria um palpite pro jogo
            guesses: {
                create: {
                    firstTeamPoints: 3,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })


}

main()