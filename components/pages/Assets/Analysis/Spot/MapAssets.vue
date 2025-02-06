<template>
	<div>
		<div class="p-4 border-b border-primary-gray-light dark:border-primary-gray-dark">
			<h3 class="text-base font-bold">
				{{ $t('mapAssets') }}
			</h3>
		</div>
		<section dir="ltr">
			<VChart
				:option="treemapOptions"
				class="w-full h-[45rem]"
			/>
		</section>
	</div>
</template>

<script setup lang="ts">
interface TreeNode {
	name: string;
	id: string;
	value: number[];
	discretion?: string;

	children?: TreeNode[];
}

const data = ref<TreeNode[]>([
	{
		value: [
			677483000,
			0,
			0,
		],
		name: 'Defense--Military Programs',
		id: 'branch-5',
		discretion: undefined,
		children: [
			{
				value: [
					294891000,
					292828000,
					0.704509131640418,
				],
				name: 'Operation and Maintenance',
				id: 'leaf-77',
				discretion: 'discretionary',
			},
			{
				value: [
					154057000,
					152586000,
					0.964046504921812,
				],
				name: 'Military Personnel',
				id: 'leaf-76',
				discretion: 'discretionary',
			},
			{
				value: [
					128051000,
					135819000,
					-5.71937652316686,
				],
				name: 'Procurement',
				id: 'leaf-78',
				discretion: 'discretionary',
			},
			{
				value: [
					75722000,
					80232000,
					-5.62119852427959,
				],
				name: 'Research, Development, Test, and Evaluation',
				id: 'leaf-79',
				discretion: 'discretionary',
			},
			{
				value: [
					13073000,
					22578000,
					-42.0985029674905,
				],
				name: 'Military Construction',
				id: 'leaf-75',
				discretion: 'discretionary',
			},
			{
				value: [
					5475000,
					4516000,
					21.2356067316209,
				],
				name: 'Military Personnel',
				id: 'leaf-83',
				discretion: 'mandatory',
			},
			{
				value: [
					3136000,
					4159000,
					-24.5972589564799,
				],
				name: 'Revolving and Management Funds',
				id: 'leaf-80',
				discretion: 'discretionary',
			},
			{
				value: [
					1695000,
					2267000,
					-25.2315835906484,
				],
				name: 'Family Housing',
				id: 'leaf-74',
				discretion: 'discretionary',
			},
			{
				value: [
					836000,
					804000,
					3.98009950248757,
				],
				name: 'Operation and Maintenance',
				id: 'leaf-84',
				discretion: 'mandatory',
			},
			{
				value: [
					447000,
					756000,
					-40.8730158730159,
				],
				name: 'Trust Funds',
				id: 'leaf-88',
				discretion: 'mandatory',
			},
			{
				value: [
					100000,
					756000,
					0,
				],
				name: 'Research, Development, Test, and Evaluation',
				id: 'leaf-86',
				discretion: 'mandatory',
			},
		],
	},
]);

function isValidNumber(num: number) {
	return num != null && isFinite(num);
}

const visualMin = 100;
const visualMax = 100;

const treemapOptions = computed(() => ({
	title: {
		left: 'center',
		text: '',
		subtext: '',
	},
	grid: {
		left: '5%',
		right: '5%',
		top: '10%',
	},
	tooltip: {
		formatter: function (info: any) {
			const value = info.value;

			const amount = isValidNumber(value[0]) ? value[0] * 1000 + '$' : '-';
			const amount2011 = isValidNumber(value[1]) ? value[1] * 1000 + '$' : '-';
			const change = isValidNumber(value[2]) ? value[2].toFixed(2) + '%' : '-';

			return [
				`<div class="tooltip-title">${info.name}</div>`,
				`2012 Amount: &nbsp;&nbsp;${amount}<br>`,
				`2011 Amount: &nbsp;&nbsp;${amount2011}<br>`,
				`Change From 2011: &nbsp;&nbsp;${change}`,
			].join('');
		},
	},
	series: [
		{
			name: 'ALL',
			top: 80,
			type: 'treemap',
			label: {
				show: true,
				formatter: '{b}',
			},
			itemStyle: {
				borderColor: '#fff',
				borderWidth: 0.1,
			},
			visualMin: visualMin,
			visualMax: visualMax,
			visualDimension: 0,
			colorMappingBy: 'id',
			levels: [
				{
					itemStyle: {
						borderWidth: 1,
						borderColor: '#333',
						gapWidth: 1,
					},
				},
				{
					color: ['#942e38', '#aa4b6b', '#ff6f61', '#27ae60', '#f39c12', '#8e44ad', '#3498db'],
					colorMappingBy: 'id',
					itemStyle: {
						gapWidth: 1,
					},
				},
			],
			data: data.value.map((item) => ({
				...item,
				itemStyle: { color: getRandomColor() },
				children: item.children?.map((child) => ({
					...child,
					itemStyle: { color: getRandomColor() },
				})),
			})),
		},
	],
}));

function getRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
</script>
