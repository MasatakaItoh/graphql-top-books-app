"use client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { PropsWithChildren } from "react";

import { BASE_URL } from "@/app/consts";

export const ApolloClientProvider = ({ children }: PropsWithChildren) => {
  const client = new ApolloClient({
    uri: `${BASE_URL}/api/graphql`,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
