"use client";
import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";

import { ADD_AUTHOR, DELETE_AUTHOR, UPDATE_NOVEL } from "@gql/mutations";
import { GET_NOVEL } from "@gql/queries";
import {
  Mutation,
  MutationAddAuthorArgs,
  MutationDeleteAuthorArgs,
  MutationUpdateNovelArgs,
  Query,
  QueryNovelArgs,
} from "@/types/generated/graphql";

type Props = {
  params: {
    id: string;
  };
};

export default function NovelPage({ params: { id } }: Props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");

  const { data, loading, error } = useQuery<
    { novel: Query["novel"] },
    QueryNovelArgs
  >(GET_NOVEL, {
    variables: { id },
  });
  const [updateNovel] = useMutation<
    { updateNovel: Mutation["updateNovel"] },
    MutationUpdateNovelArgs
  >(UPDATE_NOVEL, {
    variables: { id: id, data: { title, image: url } },
    refetchQueries: [{ query: GET_NOVEL, variables: { id } }],
  });
  const [addAuthor] = useMutation<
    { addAuthor: Mutation["addAuthor"] },
    MutationAddAuthorArgs
  >(ADD_AUTHOR, {
    variables: { novelId: id, name },
    refetchQueries: [{ query: GET_NOVEL, variables: { id } }],
  });
  const [deleteAuthor] = useMutation<
    { deleteAuthor: Mutation["deleteAuthor"] },
    MutationDeleteAuthorArgs
  >(DELETE_AUTHOR, {
    refetchQueries: [{ query: GET_NOVEL, variables: { id } }],
  });

  const { novel } = data ?? {};

  const handleAddAuthor = async () => {
    if (name === "") return alert("Please enter author name");
    await addAuthor();
    setName("");
  };

  const handleUpdateNovel = async () => {
    if (title === "" || url === "") return alert("Please enter fields");
    await updateNovel();
    setTitle("");
    setUrl("");
  };

  if (loading)
    return (
      <p className="text-white flex items-center justify-center">
        Loading ....
      </p>
    );

  if (!novel || error)
    return (
      <p className="text-white flex items-center justify-center">
        Oops! Something went wrong ....
      </p>
    );

  return (
    <article className="mx-auto p-8 max-w-3xl text-white">
      <section className="flex gap-6">
        {novel.image && (
          <img height={200} width={200} src={novel.image} alt="" />
        )}

        <div className="flex flex-col">
          <h1 className="text-4xl">Title : {novel.title}</h1>

          <div className="flex gap-3">
            {novel?.authors?.map((author) => (
              <div key={author.id} className="flex items-center gap-1">
                <button
                  onClick={() => deleteAuthor({ variables: { id: author.id } })}
                  className="font-bold"
                >
                  {author?.name}
                </button>
              </div>
            ))}
          </div>

          <p className="mt-3 text-slate-400">description ....</p>

          <div className="flex gap-3 mt-4">
            <input
              value={name}
              placeholder="Enter Author"
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent border text-white p-2 rounded-lg"
            />
            <button
              disabled={!name}
              onClick={handleAddAuthor}
              className="bg-yellow-600 text-white py-2 px-4 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Add Author
            </button>
          </div>
        </div>
      </section>

      <div className="flex gap-3 mt-8">
        <input
          value={title}
          placeholder="Enter new title"
          onChange={(e) => setTitle(e.target.value)}
          className="bg-transparent border text-white p-2 rounded-lg"
        />
        <input
          value={url}
          placeholder="new url"
          onChange={(e) => setUrl(e.target.value)}
          className="bg-transparent border text-white p-2 rounded-lg"
        />
        <button
          onClick={handleUpdateNovel}
          className="bg-yellow-600 text-white py-2 px-4 rounded-lg"
        >
          Update
        </button>
      </div>
    </article>
  );
}
