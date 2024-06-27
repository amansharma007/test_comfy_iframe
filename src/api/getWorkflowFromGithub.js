import { useMutation } from "react-query";
import axios from "axios";

export const getRepoNestedContent = async () => {
  const randomValue = Math.floor(1000 + Math.random() * 9000);

  try {
    const response = await axios.get(
      `https://api.github.com/repos/supersver/my-workflow/contents/apparel_bg_change.json?t=${randomValue}`,
      {
        headers: {
          authorization:
            localStorage.getItem("token") ||
            "Bearer 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",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error getRepoNestedContent:", error);
    throw error;
  }
};

export const useGetRepoNestedContent = (config = {}) => {
  return useMutation({
    mutationFn: () => getRepoNestedContent(),
    onError: (error) => {
      console.log("Repository nested content not fetched:", error);
    },
    onSuccess: (data) => {
      console.log("Repository nested content fetched successfully:", data);
    },
    ...config,
  });
};
