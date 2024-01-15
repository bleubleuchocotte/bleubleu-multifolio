<script setup lang="ts">
defineProps({
	email: {
		type: String,
		required: true,
	},
	marqueeText: {
		type: String,
		required: true,
	},
});
</script>

<template>
	<header class="header">
		<div class="header__slider">
			<ClientOnly>
				<Vue3Marquee
					direction="normal"
					:duration="10"
					class="header__slider-container"
				>
					<p style="margin-left: 5em" class="h1">
						{{ marqueeText }}
					</p>
				</Vue3Marquee>
			</ClientOnly>
		</div>

		<UIBaseButtonContact :email="email" class="header__button desktop-only">
			Contact
		</UIBaseButtonContact>
	</header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  @include gap();
  @include margin();

  &__slider {
    @include transition();
    @include border(0.5, var(--border-color));
		padding: 0;

    width: 100%;

    &-container {
      align-items: center;
      height: 100%;
      overflow: hidden;
    }
  }

  &__button {
    min-width: 200px;
    flex: 1;
  }
}
</style>
