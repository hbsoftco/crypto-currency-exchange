export const useEnv = (name: string) => {
	const { public: publicConfig, ...privateConfig } = useRuntimeConfig();

	return (privateConfig[name] ?? publicConfig[name]) as string;
};
