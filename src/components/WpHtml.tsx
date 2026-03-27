export function WpHtml({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={
        "wp-html max-w-none text-[15px] leading-relaxed text-[#43474e] [&_a]:text-[#006e2e] [&_a]:underline [&_img]:h-auto [&_img]:max-w-full [&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-[#c4c6cf] [&_td]:p-2 [&_th]:border [&_th]:border-[#c4c6cf] [&_th]:p-2 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#002045] [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#002045] [&_p]:mb-3 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6 " +
        (className || "")
      }
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
