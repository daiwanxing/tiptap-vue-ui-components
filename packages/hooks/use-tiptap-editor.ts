import type { Editor} from '@tiptap/vue-3';
import { useEditor } from '@tiptap/vue-3';

export function useTiptapEditor(providedEditor?: Editor | null): Editor | null {
  const { editor: coreEditor } = usdeCurrentEditor();
  return React.useMemo(
    () => providedEditor || coreEditor,
    [providedEditor, coreEditor],
  );
}
