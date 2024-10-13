export function useClipboard() {
	const toast = useToast();

	const copyText = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			toast.add({
				title: useT('copy'),
				description: useT('codeCopiedSuccessfully'),
				timeout: 5000,
				color: 'green',
			});
		}
		catch (err) {
			toast.add({
				title: useT('error'),
				description: String(err),
				timeout: 5000,
				color: 'red',
			});
		}
	};

	return { copyText	};
}
