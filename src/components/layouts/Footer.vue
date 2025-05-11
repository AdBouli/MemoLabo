<template>
    <footer class="bg-primary bg-opacity-25 p-5 text-center">
        <p>{{ $authorName }} - <a :href="`mailto:${$authorEmail}`">{{ $authorEmail }}</a></p>
    </footer>
</template>
