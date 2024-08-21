<template>
	<div>
		<div class="w-full">
			<div class="mb-4">
				<label
					class="block text-sm mb-2"
					for="phone"
				>شماره تلفن</label>
				<input
					id="phone"
					class="w-full p-2 bg-gray-700 text-white rounded"
					type="text"
					placeholder="شماره تلفن"
				>
			</div>

			<div class="mb-4">
				<label
					class="block text-sm mb-2"
					for="password"
				>رمز عبور</label>
				<input
					id="password"
					class="w-full p-2 bg-gray-700 text-white rounded"
					type="password"
					placeholder="رمز عبور"
				>
				<p class="text-xs text-gray-400 mt-2">
					حداقل دارای ۸ کاراکتر
				</p>
			</div>

			<div class="mb-4">
				<label
					class="block text-sm mb-2"
					for="referral"
				>کد معرف دارید؟</label>
				<input
					id="referral"
					class="w-full p-2 bg-gray-700 text-white rounded"
					type="text"
					placeholder="کد معرف"
				>
			</div>

			<div class="mb-4 flex items-center">
				<input
					id="terms"
					type="checkbox"
				>
				<label
					class="text-sm ml-2"
					for="terms"
				>قوانین و شرایط استفاده</label>
			</div>

			<button
				class="w-full bg-yellow-500 text-black py-2 rounded hover:bg-yellow-600"
				type="submit"
			>
				ثبت نام
			</button>
		</div>
		<p class="mt-4 text-sm">
			حساب کاربری دارید؟
			<a
				href="#"
				class="text-yellow-500"
			>ورود</a>
		</p>
	</div>
</template>
