import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/libs/utils";
import { useEffect, useRef, useState } from "react";
import { Label } from "./ui/label";

export interface ScrollSpaySectionProps {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface ScrollSpyLayoutProps {
  sections: ScrollSpaySectionProps[];
  title?: string;
  label?: string;
}

export default function ScrollSpy({ sections, title, label }: ScrollSpyLayoutProps) {
  const [activeId, setActiveId] = useState<string>("");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-30% 0% -60% 0%",
        threshold: 0.1,
      },
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      sectionRefs.current[section.id] = el;
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="relative flex w-full flex-col md:flex-row">
      <div className="w-full block md:hidden">
        {label && <Label className="mb-2 text-[10px] font-light text-white">{label}</Label>}
        {title && <h1 className="mb-11 font-poppins text-[28px] font-extralight text-white md:text-[43px]">{title}</h1>}
      </div>
      <aside className="block md:hidden top-0 mb-12 h-fit w-full">
        <ScrollOptions activeId={activeId} sections={sections} />
      </aside>
      <main className="flex-1">
        {label && <Label className="hidden md:block mb-2 text-[10px] font-light text-white">{label}</Label>}
        {title && <h1 className="hidden md:block mb-11 font-poppins text-[43px] font-extralight text-white">{title}</h1>}
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="mb-16 scroll-mt-20 leading-3">
            <h2 className="mb-4 text-sm font-medium">{s.label}</h2>
            <Label className="text-[12px] font-extralight leading-6">{s.content}</Label>
          </section>
        ))}
      </main>
      <aside className="hidden md:block sticky top-0 mb-12 h-fit w-64">
        <ScrollOptions activeId={activeId} sections={sections} />
      </aside>
    </div>
  );
}

function ScrollOptions({ sections, activeId }: { sections: ScrollSpaySectionProps[]; activeId: string }) {
  return (
    <ScrollArea className="">
      <nav className="space-y-2">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={cn(
              "block cursor-pointer text-left md:text-right font-poppins text-[10px] text-white/80 transition",
              activeId === s.id && "font-bold text-white",
            )}
          >
            {s.label}
          </a>
        ))}
      </nav>
    </ScrollArea>
  );
}
