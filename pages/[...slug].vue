<script setup>
import { ref } from "vue";
import { useFetch } from "#app";
const route = useRoute();
const queryUrl = route.query


// Here the logic for check if you are in the Preview/visual editor
// You can use a different logic, the important thing is that
// editMode variable is true if we are in the Visual Editor
const { data } = await useFetch("/api/validate-edit-mode", {
    query: queryUrl,
});
const editMode = data.value.editMode;

// retrieving the URL path
let paramSlug = route.params.slug;
console.log("PARAM SLUG", paramSlug);
let lang = null;
let website = null;
// if the first part of the URL path is a valid language
// the first part is shifted from the URL path array
// and used as lang.
// Here the list of available lang is hardcoded,
// but you can retrieve it form /spaces/me api call in the space.language_codes attribute
if (["it", "de", "fr"].includes(paramSlug[0])) {
    lang = paramSlug.shift(paramSlug);
}
if (editMode) {
    // if in Visual Editor, the first part indicates the website
    if (["website1", "website2"].includes(paramSlug[0])) {
        website = paramSlug[0];
    }
} else {
    // if is a public URL we can set the website variable
    // based on the configuration of the frontend (here is hardcoded)
    website = "website2";
    console.log(paramSlug);
    if (paramSlug) {
        paramSlug.unshift(website);
    } else {
        paramSlug = [website, "home"];
    }

    console.log(paramSlug);
}

// we can call the API with the paramSlug (setting also the language )
const slugStory = "";
const story = await useAsyncStoryblok(paramSlug.join("/"), {
    version: "draft",
    resolve_links: "url",
    language: lang,
});

</script>

<template>
    <h2>Story</h2>
    <ul>
        <li>Story ID: {{ story.id }}</li>
        <li>Story Name: {{ story.name }}</li>
        <li>Language: {{ lang }}</li>
        <li>Story Slug: {{ story.slug }}</li>
        <li>Story Full Slug: {{ story.full_slug }}</li>
        <li>URL PATH: {{ route.params.slug }}</li>
        <li>Query String: {{ queryUrl }}</li>
    </ul>
    <div>
        <p v-if="editMode">You're in edit mode.</p>
        <p v-else>You are not in edit mode.</p>
    </div>
    <h2>Story Content</h2>
    <p v-if="story.content.link && story.content.link.story">
        Render the link using the full slug:
        <b>{{ story.content.link.story.full_slug }}</b> , considering that the
        Website is <b>{{ website }}</b> and the language is <b>{{ lang }}</b>
    </p>
    <p v-else>No link set.</p>

    <p>{{ story.content.headline }}</p>
</template>
