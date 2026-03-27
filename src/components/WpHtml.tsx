export function WpHtml({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={
        "wp-html max-w-none text-[15px] leading-relaxed text-[#43474e] [&_a]:font-medium [&_a]:text-[#006e2e] [&_a]:underline-offset-2 hover:[&_a]:underline [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-lg [&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm [&_td]:border [&_td]:border-[#c4c6cf] [&_td]:p-2 [&_th]:border [&_th]:border-[#c4c6cf] [&_th]:bg-[#f2f3f9] [&_th]:p-2 [&_th]:text-left [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#002045] [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#002045] [&_p]:mb-3 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_.entry-title_a]:no-underline [&_.entry-title_a]:text-[#002045] [&_.entry-title_a]:transition-colors hover:[&_.entry-title_a]:text-[#006e2e] [&_.fusion-date-and-formats]:mb-3 [&_.fusion-date-box]:flex [&_.fusion-date-box]:items-baseline [&_.fusion-date-box]:gap-1 [&_.fusion-date]:text-lg [&_.fusion-date]:font-bold [&_.fusion-date]:text-[#002045] [&_.fusion-month-year]:text-sm [&_.fusion-month-year]:text-[#43474e] [&_.fusion-format-box]:hidden [&_input:not([type='hidden']):not([type='submit'])]:mt-1 [&_input:not([type='hidden']):not([type='submit'])]:w-full [&_input:not([type='hidden']):not([type='submit'])]:rounded-lg [&_input:not([type='hidden']):not([type='submit'])]:border [&_input:not([type='hidden']):not([type='submit'])]:border-[#c4c6cf] [&_input:not([type='hidden']):not([type='submit'])]:px-3 [&_input:not([type='hidden']):not([type='submit'])]:py-2 [&_textarea]:mt-1 [&_textarea]:w-full [&_textarea]:rounded-lg [&_textarea]:border [&_textarea]:border-[#c4c6cf] [&_textarea]:px-3 [&_textarea]:py-2 [&_input[type='submit']]:cursor-pointer [&_input[type='submit']]:rounded-lg [&_input[type='submit']]:bg-[#006e2e] [&_input[type='submit']]:px-6 [&_input[type='submit']]:py-2 [&_input[type='submit']]:font-semibold [&_input[type='submit']]:text-white " +
        (className || "")
      }
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
