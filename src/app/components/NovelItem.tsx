import { useMutation } from "@apollo/client";
import Link from "next/link";
import React from "react";

import { BASE_URL } from "@/app/consts";
import { DELETE_NOVEL } from "@gql/mutations";
import { GET_NOVELS } from "@gql/queries";
import {
  Mutation,
  MutationDeleteNovelArgs,
  Novel,
} from "@/types/generated/graphql";

type Props = {
  novel: Novel;
};

export const NovelItem = ({ novel }: Props) => {
  const [deleteNovel] = useMutation<
    { deleteNovel: Mutation["deleteNovel"] },
    MutationDeleteNovelArgs
  >(DELETE_NOVEL, {
    refetchQueries: [{ query: GET_NOVELS }],
  });

  return (
    <article className="flex flex-col p-6 bg-slate-600 text-white shadow-sm hover:shadow-lg hover:bg-slate-500 transition duration-200 ease-out">
      {novel.image && (
        <img
          src={novel.image}
          alt={novel.title ?? ""}
          className="mb-2 h-56 w-full object-contain rounded-t-lg shadow-md"
        />
      )}

      <h1 className="font-bold text-xl">{novel.title}</h1>

      <p className="text-xs my-2 line-clamp-3">descriptions ....</p>

      <div className="flex mt-auto">
        <p className="text-white">Authors :{novel?.authors?.length}</p>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <Link
          href={`${BASE_URL}/novel/${novel.id}`}
          className="bg-yellow-600 py-2 px-4 rounded-lg text-center"
        >
          Read More
        </Link>

        <button
          onClick={() => deleteNovel({ variables: { id: novel.id } })}
          className="bg-red-500 py-2 px-4 rounded-lg"
        >
          Delete
        </button>
      </div>
    </article>
  );
};
