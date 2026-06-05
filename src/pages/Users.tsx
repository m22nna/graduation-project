import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "@/context/UserContext";
import { useAllUsers } from "@/features/useDashboard";

const Users: React.FC = () => {
  const { userToken, setUserToken } = useContext(UserContext);
  const navigate = useNavigate();

  // Search and Pagination states
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 10;

  const {
    data: usersData,
    isLoading,
    error,
  } = useAllUsers(userToken ?? "");

  const users = Array.isArray(usersData)
    ? usersData
    : usersData?.data || usersData?.items || [];

  useEffect(() => {
    const err = error as any;
    if (err?.response?.status === 401) {
      setUserToken(null);
      localStorage.removeItem("userToken");
      localStorage.removeItem("userId");
      navigate("/login");
    }
  }, [error, navigate, setUserToken]);

  // Client-side filtering
  const filteredUsers = users.filter((u: any) => {
    const name = (u.fullName || u.userName || u.name || "").toLowerCase();
    const email = (u.email || "").toLowerCase();
    const query = searchQuery.toLowerCase();
    return name.includes(query) || email.includes(query);
  });

  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / pageSize) || 1;
  const paginatedUsers = filteredUsers.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
  const hasMore = pageIndex < totalPages;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPageIndex(1);
    setSearchQuery(searchInput);
  };

  if (!userToken) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container mx-auto p-5 text-white animate-fadeIn" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 text-[var(--main-internal-color)] text-lg font-bold bg-white transition px-5 py-2.5 rounded-3xl hover:opacity-90 shadow-md flex items-center gap-2"
        >
          رجوع
        </button>

        <div className="title w-fit mx-auto mb-10">
          <h2 className="text-3xl font-semibold mb-2 text-white text-center">
            إدارة المستخدمين التفصيلية
          </h2>
          <hr style={{ color: "var(--main-hover-color)" }} className="border-t-2" />
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="mb-6 flex gap-3 max-w-md mx-auto">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 bg-white text-[var(--main-internal-color)] border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-[var(--main-hover-color)] transition-all"
            placeholder="ابحث عن مستخدم بالاسم أو البريد..."
          />
          <button
            type="submit"
            className="bg-[var(--main-hover-color)] hover:opacity-90 text-white px-6 py-2 rounded-xl font-bold transition"
          >
            بحث
          </button>
        </form>

        {isLoading && (
          <p className="text-center text-2xl font-bold py-10">
            جاري التحميل...
          </p>
        )}

        {!isLoading && filteredUsers.length === 0 && (
          <div className="text-center p-10 bg-white/10 rounded-3xl border border-dashed border-gray-600">
            <p className="text-xl mb-4 text-white">لا يوجد مستخدمون حالياً يطابقون البحث</p>
          </div>
        )}

        {!isLoading && filteredUsers.length > 0 && (
          <div className="rounded-3xl">
            <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-700 bg-white">
              <table className="w-full text-[var(--main-internal-color)] text-lg">
                <thead className="bg-[var(--main-hover-color)] text-white font-bold text-center">
                  <tr>
                    <th className="p-4">#</th>
                    <th className="p-4">الاسم</th>
                    <th className="p-4">البريد الإلكتروني</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {paginatedUsers.map((u: any, index: number) => {
                    return (
                      <tr
                        key={u.id || u.userId || index}
                        onClick={() => navigate(`/dashboard/user/${u.id || u.userId}`)}
                        className="group hover:bg-green-50 transition cursor-pointer text-center"
                      >
                        <td className="p-4 text-gray-400 font-semibold">
                          {(pageIndex - 1) * pageSize + index + 1}
                        </td>

                        <td className="p-4 font-bold text-[var(--main-internal-color)] group-hover:text-[var(--main-hover-color)] transition">
                          {u.fullName || u.userName || u.name || "—"}
                        </td>

                        <td className="p-4 text-gray-600 font-semibold" dir="ltr">
                          {u.email || "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6 px-2">
              <button
                disabled={pageIndex === 1}
                onClick={() => setPageIndex((prev) => Math.max(prev - 1, 1))}
                className="bg-white text-[var(--main-internal-color)] px-4 py-2 rounded-xl font-bold shadow-md hover:bg-gray-100 disabled:opacity-50 transition"
              >
                السابق
              </button>
              <span className="text-white font-bold">
                الصفحة {pageIndex} من {totalPages}
              </span>
              <button
                disabled={!hasMore}
                onClick={() => setPageIndex((prev) => prev + 1)}
                className="bg-white text-[var(--main-internal-color)] px-4 py-2 rounded-xl font-bold shadow-md hover:bg-gray-100 disabled:opacity-50 transition"
              >
                التالي
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
