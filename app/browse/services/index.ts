import api from "@/utils/axios";
export type SortValueType =
  | "newest"
  | "price_asc"
  | "price_desc"
  | "popular"
  | "title-asc";

export async function getCourses(
  page?: number,
  sort?: SortValueType,
  search?: string,
  categoryFilters?: number[],
  topicFilters?: number[],
  instructorFilters?: number[],
) {
  try {
    const query = new URLSearchParams();
    query.append("page", String(page ?? 1));
    if (search) query.append("search", search);
    if (sort) query.append("sort", sort);

    // Categories
    categoryFilters?.forEach((id) => query.append("categories[]", String(id)));

    // Topics
    topicFilters?.forEach((id) => query.append("topics[]", String(id)));

    // Instructors
    instructorFilters?.forEach((id) =>
      query.append("instructors[]", String(id)),
    );

    const res = await api.get(`/courses?${query.toString()}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getCategoryFilters() {
  try {
    const res = await api.get("/categories");
    console.log(res);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getTopicFilters() {
  try {
    const res = await api.get("/topics");
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getIntructorFilters() {
  try {
    const res = await api.get("/instructors");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
