// A plain anchor wrapper used in place of next/link.
//
// Why: this site is statically exported and deployed under arbitrary
// path prefixes (S3 preview URLs, GitHub Pages, etc.). next/link would
// keep the configured-time absolute href ("/about") at hydration, and
// any subsequent SPA navigation would request "/about" relative to the
// document origin — breaking on prefixed deployments.
//
// Plain anchors use the rendered href verbatim (which our post-build
// rewrite step converts to a relative URL like "./about/"). Each page
// transition is a full reload, which is fine for this 5-page site.
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

export default function Link({ href, children, ...rest }: Props) {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
