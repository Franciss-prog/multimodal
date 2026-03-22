<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import heroBackground from '$lib/assets/images/bg.jpg';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
	let pathname = $derived(page.url.pathname);
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<main
	class="min-h-screen"
	style={pathname === '/'
		? `background-image: linear-gradient(rgb(0 0 0 / 18%), rgb(0 0 0 / 18%)), url(${heroBackground}); background-size: cover; background-position: center; background-repeat: no-repeat;`
		: ''}
>
	<Navbar />
	{@render children()}
	<Footer />
</main>
