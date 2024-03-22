// NavigationPath.js
import Link from "next/link";
import { useRouter } from "next/router";

const NavigationPath = () => {
 const router = useRouter();
 const currentPath = router.pathname;
 const queryParams = router.query;

 // Define the order of pages in the navigation path with an index
 const pages = [
    { path: "/specialization", label: "Specialization", index: 1 },
    { path: "/ay", label: "Batch", index: 2 },
    { path: "/sem", label: "Semester", index: 3 },
    { path: "/courses", label: "Courses", index: 4 },
    { path: "/courses/details", label: "Course Details", index: 5 },
    { path: "/projects", label: "Project", index: 6 },
 ];

 // Determine the index of the current page
 // Explicitly handle "/courses/details" case
 let currentPageIndex = pages.findIndex(page => currentPath === page.path);

 // If "/courses/details" is not found, use the existing logic
 if (currentPageIndex === -1) {
   currentPageIndex = pages.findIndex(page => currentPath.startsWith(page.path));
 }

 return (
    <div className="mt-24">
      <ul className="flex gap-3">
        {pages.map((page, index) => {
          // Only render pages with an index less than the current page's index as clickable
          if (index < currentPageIndex) {
            // Construct the href with query parameters
            const href = `${page.path}?${new URLSearchParams(queryParams).toString()}`;
            return (
              <li key={page.path}>
                <Link href={href}>
                 <span className="font-semibold text-slate-500 hover:text-slate-800">{page.label} /</span>
                </Link>
              </li>
            );
          } else if (index === currentPageIndex) {
            // Render the current page as plain text
            return <li key={page.path}>{page.label}</li>;
          }
          // Do not render pages with an index greater than the current page's index
          return null;
        })}
      </ul>
    </div>
 );
};

export default NavigationPath;
