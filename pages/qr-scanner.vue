<template>
	<div>
		<p>
			از این بخش می‌توانید فقط QR Code را اسکن کنید.
		</p>

		<p
			v-if="error"
			class="error"
		>
			{{ error }}
		</p>
		<p class="decode-result">
			نتیجه اسکن: <b>{{ result }}</b>
		</p>

		<qrcode-stream
			:constraints="constraints"
			@error="onError"
			@detect="onDetect"
		/>
	</div>
</template>

<script setup lang="ts">
// نتیجه اسکن‌شده
const result = ref('');

// تنظیمات دوربین (پیش‌فرض دوربین پشت)
const constraints = ref({ facingMode: 'environment' });

// خطاها
const error = ref('');

// مدیریت رویداد تشخیص
function onDetect(detectedCodes: any) {
	console.log(detectedCodes);
	result.value = detectedCodes[0]?.rawValue || 'کدی شناسایی نشد!';
}

// مدیریت خطاها
function onError(err: any) {
	error.value = `[${err.name}]: `;
	if (err.name === 'NotAllowedError') {
		error.value += 'دسترسی به دوربین نیاز است.';
	}
	else if (err.name === 'NotFoundError') {
		error.value += 'دوربینی یافت نشد.';
	}
	else if (err.name === 'NotSupportedError') {
		error.value += 'استفاده از HTTPS یا localhost الزامی است.';
	}
	else {
		error.value += err.message;
	}
}
</script>

  <style scoped>
  .error {
    font-weight: bold;
    color: red;
  }
  .decode-result {
    font-size: 1.2rem;
    margin-top: 1rem;
  }
  </style>
