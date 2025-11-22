import { useQuery } from "@tanstack/react-query";

import { restApi } from "./api";

export const useGetPosts = () => {
  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [restApi.baseUrl, "posts"],
    queryFn: ({ signal }) => restApi.get({ signal }),
  });

  return {
    posts,
    isLoading,
    error,
    refetch,
  };
};
