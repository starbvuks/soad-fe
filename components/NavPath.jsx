// NavigationPath.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

const NavigationPath = () => {
  const router = useRouter();
  const { specId, ayId, semId } = router.query;
  const [specializationName, setSpecializationName] = useState("");
  const [ayName, setAyName] = useState("");
  const [semName, setSemName] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const token = process.env.NEXT_PUBLIC_TOKEN;

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true); // Set loading to true before fetching

      if (specId) {
        try {
          const response = await axios.get(
            `https://soad.alephinnovation.live/api/specializations/${specId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSpecializationName(
            response.data.data.attributes.specializationName
          );
        } catch (error) {
          console.error("Failed to fetch specialization details:", error);
        }
      }

      if (ayId) {
        try {
          const response = await axios.get(
            `https://soad.alephinnovation.live/api/academic-years/${ayId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setAyName(response.data.data.attributes.ay);
        } catch (error) {
          console.error("Failed to fetch academic year details:", error);
        }
      }

      if (semId) {
        try {
          const response = await axios.get(
            `https://soad.alephinnovation.live/api/semesters/${semId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSemName(response.data.data.attributes.semesterNum);
        } catch (error) {
          console.error("Failed to fetch semester details:", error);
        }
      }

      setIsLoading(false); // Set loading to false after fetching
    };

    fetchDetails();
  }, [specId, ayId, semId]);

  // Skeleton component
  const Skeleton = () => (
    <div className="skeleton">
      <div className="skeleton-item"></div>
      <div className="skeleton-item"></div>
      <div className="skeleton-item"></div>
    </div>
  );

  // CSS for the skeleton
  const skeletonStyle = `
 .skeleton {
   display: flex;
   gap: 10px;
   margin-top: 72px;
 }
 .skeleton-item {
   background: linear-gradient(90deg, #ddd, #e0e0e0, #ddd);
   border-radius: 4px;
   width: 100px;
   height: 20px;
   position: relative;
   overflow: hidden;
 }
 .skeleton-item::before {
   content: "";
   position: absolute;
   top: 0;
   left: -200px;
   width: 200px;
   height: 100%;
   background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
   animation: shimmer 2.5s infinite;
 }
 @keyframes shimmer {
   100% { left: 100%; }
 }
`;

  // Conditional rendering based on loading state
  if (isLoading) {
    return (
      <div>
        <style>{skeletonStyle}</style>
        <Skeleton />
      </div>
    );
  }

  const currentPath = router.pathname;
  const queryParams = router.query;

  const pages = [
    { path: "/specialization", label: specializationName, index: 1 },
    { path: "/ay", label: `Batch ${ayName}`, index: 2 },
    { path: "/sem", label: `Sem ${semName}`, index: 3 },
    { path: "/courses", label: "Courses", index: 4 },
    { path: "/courses/details", label: "Course Details", index: 5 },
    { path: "/projects", label: "Project", index: 6 },
  ];

  let currentPageIndex = pages.findIndex((page) => currentPath === page.path);

  if (currentPageIndex === -1) {
    currentPageIndex = pages.findIndex((page) =>
      currentPath.startsWith(page.path)
    );
  }

  return (
    <div className="mt-20">
      <ul className="flex flex-wrap gap-1 lg:gap-3">
        {pages.map((page, index) => {
          if (index < currentPageIndex) {
            const href = `${page.path}?${new URLSearchParams(
              queryParams
            ).toString()}`;
            return (
              <li key={page.path}>
                <Link href={href}>
                  <span className="font-semibold text-slate-500 hover:text-slate-800 text-sm lg:text-lg">
                    {page.label} /
                  </span>
                </Link>
              </li>
            );
          } else if (index === currentPageIndex) {
            return <li key={page.path} className="pt-[1px] lg:pt-[2px]">{page.label}</li>;
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default NavigationPath;
