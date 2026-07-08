import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthProvider";

export const EnrollContext = createContext();

const API = "http://localhost:4001";

export default function EnrollProvider({ children }) {
  const [authUser] = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = authUser?._id;

  const refreshEnrollments = async () => {
    if (!userId) {
      setEnrolledCourses([]);
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(`${API}/enrollment/${userId}`);
      setEnrolledCourses(res.data);
    } catch (error) {
      console.log("Error fetching enrollments: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshEnrollments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // Checks out everything currently in the user's cart (server-side) and
  // moves it into their enrollments. Returns the updated enrollment list.
  const checkout = async () => {
    if (!userId) return [];
    const res = await axios.post(`${API}/enrollment/checkout`, { userId });
    setEnrolledCourses(res.data.enrollments);
    return res.data.enrollments;
  };

  const updateProgress = async (courseId, progress) => {
    if (!userId) return;
    try {
      await axios.patch(`${API}/enrollment/${userId}/${courseId}`, { progress });
      setEnrolledCourses((prev) =>
        prev.map((c) => (c._id === courseId ? { ...c, progress } : c))
      );
    } catch (error) {
      console.log("Error updating progress: ", error);
      throw error;
    }
  };

  const isEnrolled = (id) => enrolledCourses.some((c) => c._id === id);

  return (
    <EnrollContext.Provider
      value={{
        enrolledCourses,
        loading,
        checkout,
        refreshEnrollments,
        updateProgress,
        isEnrolled,
      }}
    >
      {children}
    </EnrollContext.Provider>
  );
}

export const useEnroll = () => useContext(EnrollContext);
