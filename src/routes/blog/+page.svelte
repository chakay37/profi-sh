<script lang="ts">
	import './blog.scss';
	import Title from '$lib/components/Title.svelte';
</script>

<main>
	<section>
		<div class="select-article">
			<input type="radio" name="clanek" id="1" checked />
			<label class="radio-item" for="1">
				<h3>O Ekologii</h3>
				<p>2.8.2023</p>
			</label>
			<input type="radio" name="clanek" id="2" />
			<label class="radio-item" for="2">
				<h3>O Ekologii</h3>
				<p>2.8.2023</p>
			</label>
			<input type="radio" name="clanek" id="3" />
			<label class="radio-item" for="3">
				<h3>O Ekologii</h3>
				<p>2.8.2023</p>
			</label>
			<input type="radio" name="clanek" id="4" />
			<label class="radio-item" for="4">
				<h3>O Ekologii</h3>
				<p>2.8.2023</p>
			</label>
		</div>
		<div class="article">
			<Title>O Ekologii</Title>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat, voluptatem explicabo
				voluptates nisi perspiciatis est mollitia, natus laboriosam adipisci libero omnis vel, quae
				vero quia et provident facilis vitae repudiandae! Lorem, ipsum dolor sit amet consectetur
				adipisicing elit. Mollitia perspiciatis debitis ratione illum corporis? Omnis repellat fuga
				autem similique! Voluptas quam, explicabo illo voluptatum voluptatem repudiandae accusamus
				et soluta beatae.
			</p>
		</div>
	</section>
</main>
