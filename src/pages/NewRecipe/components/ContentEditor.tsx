import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const ContentEditor = ({ onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-md xl:prose-lg focus:outline-none w-full rounded-md border border-input bg-transparent p-6 text-sm shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
  });

  return <EditorContent editor={editor} />;
};

export default ContentEditor;
