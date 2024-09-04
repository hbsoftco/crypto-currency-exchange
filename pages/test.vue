<template>
	<div class="bg-black text-white py-10">
		<h2 class="text-center text-3xl font-bold mb-6">
			چرا بیت لند
		</h2>
		<p class="text-center mb-10 px-4">
			بدون شک سرمایه‌گذاری موفق و به دست آوردن موفقیت‌های مالی پیش‌نیازهای زیادی دارد. علاوه بر داشتن آگاهی و تخصص در این حوزه انتخاب یک پلتفرم حرفه ای با رابط کاربری آسان یک ضرورت مهم در حوزه ارز های دیجیتال می باشد.
		</p>
		<div class="flex justify-center items-center gap-8 px-4">
			<!-- Step 1 -->
			<div class="relative circle-container">
				<div class="outer-circle">
					<div class="inner-circle">
						<div class="icon">
							<!-- <img
								src="path/to/icon1.svg"
								alt="icon"
								class="w-10 h-10"
							> -->
						</div>
					</div>
				</div>
				<h3 class="text-center mt-4 text-sm font-semibold">
					دارای کمترین کارمزد در ایران
				</h3>
				<p class="text-center text-xs mt-1">
					01 STEP
				</p>
			</div>
			<!-- تکرار بلاک برای هر مرحله دیگر -->
		</div>
	</div>
</template>

<style>
.circle-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.outer-circle {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 4px dashed rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.inner-circle {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0a0a0a; /* تنظیم رنگ پس‌زمینه */
}

.icon {
    width: 50px;
    height: 50px;
    background-color: #1e3a8a; /* رنگ برای دایره آیکون */
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.circle-container::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 70px;
    height: 35px;
    background: rgba(255, 255, 255, 0.1);
    border-top-left-radius: 35px;
    border-top-right-radius: 35px;
}

.circle-container::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    width: 50px;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.3);
}
</style>
