import { Resolvers } from "@/types/generated/graphql";

const checkMissData = <T extends object>(data: T): T => {
  if (Object.entries(data).some((x) => x === undefined)) {
    throw Error("Data is missing.");
  }
  return data;
};

export const resolvers: Resolvers = {
  Novel: {
    authors: async (parent, args, context) =>
      await context.prisma.author.findMany({ where: { novelId: parent.id } }),
  },
  Query: {
    novel: async (parent, args, context) => {
      const novel = await context.prisma.novel.findUnique({
        where: { id: args.id },
      });
      if (!novel) throw Error("No novel with the specified ID exists.");
      return novel;
    },
    novels: async (parent, args, context) =>
      await context.prisma.novel.findMany(),
  },
  Mutation: {
    addNovel: async (parent, args, context) => {
      const data = checkMissData<typeof args.data>(args.data);
      return context.prisma.novel.create({ data });
    },
    updateNovel: async (parent, args, context) => {
      const data = checkMissData<typeof args.data>(args.data);
      return context.prisma.novel.update({ where: { id: args.id }, data });
    },
    deleteNovel: async (parent, args, context) => {
      return context.prisma.novel.delete({ where: { id: args.id } });
    },
    addAuthor: async (parent, args, context) => {
      return context.prisma.author.create({ data: { name: args.name } });
    },
    deleteAuthor: async (parent, args, context) => {
      return context.prisma.author.delete({ where: { id: args.id } });
    },
  },
};
