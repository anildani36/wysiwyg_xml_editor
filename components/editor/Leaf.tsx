import { RenderLeafProps } from "slate-react";
import { CustomText } from "@/lib/slate/types";

export function Leaf({ attributes, children, leaf }: RenderLeafProps) {
  let el = children;
  const customLeaf = leaf as CustomText;

  if (customLeaf.bold) {
    el = <strong>{el}</strong>;
  }

  if (customLeaf.italic) {
    el = <em>{el}</em>;
  }

  if (customLeaf.underline) {
    el = <u>{el}</u>;
  }

  if (customLeaf.code) {
    el = (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
        {el}
      </code>
    );
  }

  return <span {...attributes}>{el}</span>;
}
