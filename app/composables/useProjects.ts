export const useProjects = async (): Promise<ProjectWithId[]> => {
	const { data } = await useWebsite();
	const items = data.value?.data.projects ?? [];

	return items
		.map((item) => {
			if ("data" in item.project && item.project.data) {
				return Object.assign(item.project.data, { id: item.project.id });
			}
			return null;
		})
		.filter((el): el is ProjectWithId => el !== null);
};
