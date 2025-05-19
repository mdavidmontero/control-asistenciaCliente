import { useQuery } from "@tanstack/react-query";
import { getUser } from "../actions/auth.actions";
import { userAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

export const useAuth = () => {
  const setUser = userAuthStore((state) => state.setUser);
  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return { data, isError, isLoading };
};
