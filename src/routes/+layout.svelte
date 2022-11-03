<script>
	import '../app.css';
</script>

<div id="app-wrapper">
	<header id="app-nav">
		<div id="logo">wannago</div>
	</header>
	<div id="app-body">
		<slot />
	</div>
</div>

<style>
	#app-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-flow: column;
		overflow: hidden;
	}

	#app-nav {
		flex: 0 0 70px;
		display: flex;
		align-items: center;
	}

	#app-body {
		flex-grow: 1;
		position: relative;
	}

	#logo {
		font-size: 23px;
		padding-left: 28px;
	}
</style>
