<script setup lang="ts">
const { $api } = useNuxtApp();
const page = await $api.pages.getLegalNotices();

const isDeviceMobile = useMediaQuery("(max-width: 768px)");
</script>

<template>
	<div class="legal-container">
		<UIBaseButtonHome class="legal-container__button">
			Let's go home
		</UIBaseButtonHome>

		<template v-if="!isDeviceMobile">
			<div
				v-for="i in 2"
				:key="Math.floor(Math.random() * (100 + i))"
				class="legal-container__bands"
			>
				<div
					v-for="j in 6"
					:key="Math.floor(Math.random() * (100 + j))"
					class="legal-container__bands-notices"
					:aria-hidden="!(j === 1 && i === 1)"
				>
					<h1>Legal Notices</h1>

					<h2>Company Information</h2>
					<p>Last name: {{ page?.data['me-last-name'] }}</p>
					<p>First name: {{ page?.data['me-first-name'] }}</p>
					<p>Adress: {{ page?.data['me-address'] }}</p>
					<p>Status: Entrepreneur individuel (EI)</p>
					<p>Email: {{ page?.data['me-email'] }}</p>
					<p>Phone: {{ page?.data['me-phone-number'] }}</p>

					<template v-if="page?.data['me-tva-number'] != null">
						<h2>VAT Identification Number:</h2>
						<p>{{ page.data['me-tva-number'] }}</p>
					</template>

					<h2>Website Host:</h2>
					<p>Host name: {{ page?.data['host-name'] }}</p>
					<p>Host address: {{ page?.data['host-adress'] }}</p>
					<p />
					<p>Host phone: {{ page?.data['host-phone-number'] }}</p>
				</div>
			</div>
		</template>

		<template v-else>
			<div class="legal-container__bands-notices">
				<h1>Legal Notices</h1>

				<h2>Company Information</h2>
				<p>Last name: {{ page?.data['me-last-name'] }}</p>
				<p>First name: {{ page?.data['me-first-name'] }}</p>
				<p>Adress: {{ page?.data['me-address'] }}</p>
				<p>Status: Entrepreneur individuel (EI)</p>
				<p>Email: {{ page?.data['me-email'] }}</p>
				<p>Phone: {{ page?.data['me-phone-number'] }}</p>

				<template v-if="page?.data['me-tva-number'] != null">
					<h2>VAT Identification Number:</h2>
					<p>{{ page.data['me-tva-number'] }}</p>
				</template>

				<h2>Website Host:</h2>
				<p>Host name: {{ page?.data['host-name'] }}</p>
				<p>Host address: {{ page?.data['host-adress'] }}</p>
				<p />
				<p>Host phone: {{ page?.data['host-phone-number'] }}</p>
			</div>
		</template>
	</div>
</template>

<style scoped lang="scss">
.legal-container {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--border-color);

  @media #{$mobile-down} {
    display: flex;
    flex-direction: column-reverse;
    border-bottom: none;
  }

  &__button {
    height: 7vw;
    width: 20vw;
    z-index: 5;
    border: 1px solid var(--background-color);
    position: absolute;
    top: calc(50% - 3.5vw);
    left: calc(50% - 10vw);
    @include font("h2");

    @media #{$mobile-down} {
      height: 10vw;
      width: 30vw;
      position: relative;
      top: initial;
      left: initial;
      @include font("cta");
      @include margin();
    }
  }

  &__bands {
    width: max-content;
    display: flex;
    border: 1px solid var(--border-color);
    background-color: var(--background-color);

    &:first-of-type {
      border-bottom: unset;
    }
    border-left: none;

    &-notices {
      @include padding();

      h2 {
        @include prop("margin-block", 0.5);
      }
    }
  }
}
</style>
