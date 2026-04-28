<script setup lang="ts">
import type { Content } from "@prismicio/client";

type ComponentProps = {
	links: Content.WebsiteDocumentDataLinksItem[]
};

defineProps<ComponentProps>();
</script>

<template>
	<div>
		<footer class="footer">
			<div class="footer__left">
				<NuxtLink
					to="https://bleubleu.studio"
					target="_blank"
					class="footer__left-link"
				>
					{{ $t('misc.made-with-love') }}
					<IconBaseArrowLink
						:colors="{
							background: 'transparent',
							arrow: 'var(--text-color)',
						}"
					/>
				</NuxtLink>
			</div>
			<div class="footer__right">
				<PrismicLink
					v-for="link in links"
					:key="link.name?.toString()"
					class="footer__right-link"
					:field="link.link"
				>
					{{ link.name }}
					<IconBaseArrowLink
						:colors="{
							background: 'transparent',
							arrow: 'var(--text-color)',
						}"
					/>
				</PrismicLink>
				<NuxtLink to="/legal-notice" class="footer__right-link">
					{{ $t('page.legal-notice.link') }}
				</NuxtLink>
				<UIBaseCopyright />
			</div>
		</footer>
	</div>
</template>

<style scoped lang="scss">
.footer {
	display: flex;

	@include prop("padding-block");

	&__left {
		@include left;

		&-link {
			width: fit-content;
		}
	}
	&__right {
		@include right;

		display: flex;
		justify-content: space-between;

		padding-left: 0;
	}

	&__left,
	&__right {
		&-link {
			@include font("cta");

			display: flex;
			align-items: flex-end;
		}
	}
}
</style>
