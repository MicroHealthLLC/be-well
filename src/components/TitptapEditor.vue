<template>
  <tiptap-vuetify
    v-model="article.body"
    :extensions="extensions"
    :toolbar-attributes="{ color: 'var(--mh-green)', dark: true }"
    :card-props="{ flat: true, outlined: true }"
    placeholder="Your article here..."
  />
</template>

<script>
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  History,
} from "tiptap-vuetify";
import { mapGetters } from "vuex";

export default {
  components: {
    TiptapVuetify,
  },
  computed: {
    ...mapGetters(["article"]),
  },
  data() {
    return {
      extensions: [
        History,
        Bold,
        Underline,
        Strike,
        Italic,
        Paragraph,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3],
            },
          },
        ],
        Blockquote,
        Link,
        ListItem,
        BulletList,
        OrderedList,
      ],
    };
  },
};
</script>

<style scoped>
:deep .tiptap-vuetify-editor__content {
  background-color: #f0f0f0;
  max-height: 65vh;
  overflow-y: scroll;
}
:deep h1 {
  font-size: 2rem !important;
  font-weight: 400;
  line-height: 2.5rem;
  letter-spacing: 0.0073529412em !important;
  font-family: "Roboto", sans-serif !important;
}
:deep h2 {
  font-size: 1.5rem !important;
  font-weight: 500;
  letter-spacing: normal;
  font-family: "Roboto", sans-serif !important;
}
:deep h3 {
  font-size: 1.25rem !important;
  font-weight: 500;
  letter-spacing: 0.0125em !important;
  font-family: "Roboto", sans-serif !important;
}
:deep .tiptap-vuetify-editor__content ul p,
:deep .tiptap-vuetify-editor__content ol p {
  margin: 0 !important;
}
:deep .tiptap-vuetify-editor__content ul,
:deep .tiptap-vuetify-editor__content ol {
  margin-left: 25px !important;
}
:deep .tiptap-vuetify-editor__content p {
  font-size: 16px;
  line-height: 1.75;
}
:deep .theme--light.v-sheet--outlined {
  border-color: #969696;
}
:deep blockquote {
  border-left: 0.25em solid var(--mh-green);
}
</style>
