import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (setActiveId: any) => {
  const headingElementsRef = useRef<any>({});

  useEffect(() => {
    const callback = (headings: any) => {
      headingElementsRef.current = headings.reduce((map: any, headingElement: any) => {
        map[headingElement.id] = headingElement;
        return map;
      }, headingElementsRef.current);

      const visibleHeadings: any[] = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id: string) =>
        headingElements.findIndex((heading) => heading.id === id);

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id)
        );
        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-40px 0px -90% 0px'
    });

    const headingElements = Array.from(document.querySelectorAll('h2, h3')).filter(
      (heading) => !['table-of-contents', 'article-same-author'].includes(heading.id)
    );
    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId]);
};
