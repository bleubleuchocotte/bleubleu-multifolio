export const usePrismicClient = () => {
  const { client } = usePrismic();

  const getAllProjects = () => {
    return useAsyncData("GetAllProjects", () => client.getAllByType("projet"));
  };

  const getWebsite = () => {
    return useAsyncData("GetWebsite", () => client.getByType("website"), {
      transform: (el) => el.results[0],
    });
  };

  return { getAllProjects, getWebsite };
};
