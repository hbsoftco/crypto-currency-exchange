<template>
	<component
		:is="tag"
		ref="dropzoneEl"
		@drop="onDrop"
		@dragenter="setActive"
		@dragover="setActive"
		@dragleave="setInactive"
		@click="triggerFileInput"
	>
		<slot :drop-zone-active="active" />

		<input
			ref="fileInput"
			type="file"
			style="display: none"
			@change="onFileChange"
		>
	</component>
</template>

<script setup lang="ts">
import { useEventListener } from '@vueuse/core';

type PropsDefinition = {
	tag?: keyof HTMLElementTagNameMap;
};

withDefaults(defineProps<PropsDefinition>(), {
	tag: 'div',
});

const dropzoneEl = ref();
const fileInput = ref<HTMLInputElement | null>(null);
const active = ref(false);
let inActiveTimeout: NodeJS.Timeout | undefined = undefined;

const events: Array<keyof WindowEventMap> = ['dragenter', 'dragover', 'dragleave', 'drop'];

type EmitDefinition = {
	onTransfer: [files: FileList];
	onDragEnter: [event: DragEvent];
	onDragOver: [event: DragEvent];
	onDragLeave: [event: DragEvent];
	onDrop: [event: DragEvent];
};

const emit = defineEmits<EmitDefinition>();

const onDrop = (e: DragEvent) => {
	setInactive();
	if (e.dataTransfer) {
		emit('onTransfer', e.dataTransfer.files);
	}
};

const onFileChange = (event: Event) => {
	const input = event.target as HTMLInputElement;
	if (input.files) {
		emit('onTransfer', input.files);
	}
};

const triggerFileInput = () => {
	if (fileInput.value) {
		fileInput.value.click();
	}
};

const setActive = () => {
	active.value = true;
	clearTimeout(inActiveTimeout);
};

const setInactive = () => {
	inActiveTimeout = setTimeout(() => {
		active.value = false;
	}, 50);
};

const dragEventsHandler = (e: DragEvent) => {
	e.preventDefault();
	const emitNames = {
		dragenter: 'onDragEnter',
		dragover: 'onDragOver',
		dragleave: 'onDragLeave',
		drop: 'onDrop',
		transfer: 'onTransfer',
	};
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error next-line
	emit(emitNames[e.type], e);
};

events.forEach((eventName) => {
	useEventListener(dropzoneEl, eventName, dragEventsHandler);
});

onBeforeUnmount(() => {
	clearTimeout(inActiveTimeout);
});
</script>
