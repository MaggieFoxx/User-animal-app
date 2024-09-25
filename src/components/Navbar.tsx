"use client";

export const Navbar = () => {
  return (
    <nav className="flex flex-wrap items-center justify-between px-4 md:px-16 py-4 bg-gray-200">
      <div className="md:text-2xl font-semibold tracking-tight">InQool test app</div>
      <ul className="flex text-base md:ml-auto md:text-2xl font-semibold tracking-tight">
        <li>
          <a className="mr-6 flex-shrink-0" href="/">
            <span>Home</span>
          </a>
        </li>
        <li>
          <a className="mr-6 flex-shrink-0" href="/users">
            <span>Users</span>
          </a>
        </li>
        <li>
          <a className="mr-6 flex-shrink-0" href="/animals">
            <span>Animals</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};
