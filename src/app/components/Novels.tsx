"use client";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

import { ADD_NOVEL } from "@gql/mutations";
import { GET_NOVELS } from "@gql/queries";
import {
  Mutation,
  MutationAddNovelArgs,
  Query,
} from "@/types/generated/graphql";

import { NovelItem } from "./NovelItem";

export const Novels = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const { data, loading, error } = useQuery<{ novels: Query["novels"] }>(
    GET_NOVELS,
  );
  const [addNovel, { loading: adding }] = useMutation<
    { addNovel: Mutation["addNovel"] },
    MutationAddNovelArgs
  >(ADD_NOVEL, {
    variables: { data: { title, image } },
    refetchQueries: [{ query: GET_NOVELS }],
  });

  const novels = data?.novels ?? [];

  const handleSubmit = async () => {
    if (image === "" || title === "") return alert("Enter fields");

    await addNovel();
    setTitle("");
    setImage("");
  };

  if (loading)
    return (
      <p className="text-white flex items-center justify-center">
        Loading ....
      </p>
    );
  if (error)
    return (
      <p className="text-white flex items-center justify-center">
        Oops! Something went wrong ....
      </p>
    );

  return (
    <div>
      <div className="flex gap-3">
        <input
          name={"title"}
          value={title}
          placeholder="Enter title"
          disabled={adding}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-transparent border text-white p-2 rounded-lg"
        />
        <input
          value={image}
          placeholder="Enter Image url"
          disabled={adding}
          onChange={(e) => setImage(e.target.value)}
          className="bg-transparent border text-white p-2 rounded-lg"
        />
        <button
          onClick={handleSubmit}
          disabled={adding}
          className="bg-yellow-600 text-white py-2 px-4 rounded-lg"
        >
          {adding ? "Adding ...." : "Add Novel"}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-8">
        {novels.map((novel) => (
          <NovelItem key={novel.id} novel={novel} />
        ))}
      </div>
    </div>
  );
};
