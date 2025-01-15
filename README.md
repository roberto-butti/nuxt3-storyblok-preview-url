# Understanding Slugs and URLs in Storyblok: API, Visual Editor, and Public URLs

When working with Storyblok, it's crucial to differentiate between the **slug of the story** used by the Content Delivery API, the URL structure for the **Visual Editor**, and the **public URL** presented to end users. Here's a breakdown:

------

## 1. **Slug in the Content Delivery API**

The slug used for retrieving a single Story via  the Content Delivery API reflects the story's location within the Storyblok folder structure. For example:

```bash
/folder1/subfolder1/story1
```

This slug is independent of any language settings. The language with the Content Delivery API  is passed separately as a query parameter (e.g., `lang=it`), ensuring the same slug can retrieve language-specific content.

------

## 2. **URL in the Visual Editor**

The Visual Editor URL in Storyblok (the Preview URL) may include the language code depending on the context:

- **Default Language:** The language code is omitted, e.g., `/folder1/subfolder1/story1`.
- **Specific Language:** The language code is prefixed, e.g., `/it/folder1/subfolder1/story1`.

This structure allows content editors to preview content in different languages directly within the editor.

------

## 3. **Public URL for end-users**

The public URL presented to end users depends on how your frontend is designed to interpret and render content. In the simplest scenario, the URL path is used as a slug for the Story. If you need a specific and custom behavior/mapping, you can apply a specific logic. For example:

- Assume that all content for `domain.com` is stored in the `folder1` folder in Storyblok.
- The frontend uses a "strong assumption" to map the `folder1` folder as the base for the public domain.

In this scenario, the public URL might look like:

```bash
domain.com/subfolder1/story1
```

Here’s how this is mapped:

- The frontend interprets the browser URL path `/subfolder1/story1` as corresponding to the story with the slug `/folder1/subfolder1/story1`.
- The domain or user preferences infer the language (e.g., it or de ...) (or from the first part of the path in the Public URL, for example, `domain.com/it/subfolder1/story1`).

------

## Why This Matters

By understanding these distinctions:

1. You can optimize API calls by passing only necessary parameters (e.g., slugs and language codes).
2. Editors can preview language-specific content intuitively in the Visual Editor.
3. End users experience clean, user-friendly URLs, even when content is stored in a deeply structured hierarchy.

This approach ensures a seamless experience for developers, editors, and users while maintaining content organization and multilingual support flexibility.



An example of code is here [pages/[...slug].vue](pages/[...slug].vue)
