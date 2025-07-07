import { LinksNav } from "@/data/LinksNav";
import { userAuthStore } from "@/store/useAuthStore";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const user = userAuthStore((state) => state.user);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpenSidebar(false);
      }
    };

    if (isOpenSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenSidebar]);

  if (!user) {
    return (
      <aside className="flex flex-col bg-white md:w-72 md:h-screen">
        <div className="p-5 text-center">Cargando...</div>
      </aside>
    );
  }

  const filteredNavigation = LinksNav.filter((nav) =>
    nav.allowedRoles.includes(user.role)
  );

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-700 rounded-lg sm:hidden w-12"
        onClick={() => setIsOpenSidebar(true)}
      >
        <Bars3Icon className="w-8 h-8 text-black" />
      </button>

      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-[#4CAF7D] border-r shadow transition-transform duration-300 ease-in-out ${
          isOpenSidebar ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="mb-8">
            <Link to={"/register-attendance"}>
              <img src="/logo.svg" alt="Logo" className="w-56 mx-auto" />
            </Link>
          </div>

          <nav className="flex flex-col gap-2">
            {filteredNavigation.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-white text-[#333] font-semibold shadow"
                      : "text-[#F8FAFC] hover:bg-[#6BB29B] hover:text-[#F8FAFC]"
                  }`
                }
                onClick={() => setIsOpenSidebar(false)}
              >
                <span className="w-full text-left">{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto text-xs text-white text-center pt-6">
            © 2025 Seynekun
          </div>
        </div>
      </aside>
    </>
  );
}
