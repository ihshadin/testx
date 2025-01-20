export const transformToTreeData = (data: any[]): any[] => {
  // Group subjects by their course ID
  const groupedByCourse = data?.reduce((acc: any, subject) => {
    const courseId = subject?.course?._id; // Get the course ID from the course object
    if (!acc[courseId]) {
      acc[courseId] = {
        value: subject?.course?._id,
        title: subject?.course?.name, // Use course name as the parent title
        disabled: true,
        children: [],
      };
    }

    // Add the subject as a child of the course
    acc[courseId].children.push({
      value: subject?._id,
      title: subject?.name,
    });

    return acc;
  }, {});

  // Convert the grouped data into an array of treeData
  return Object.values(groupedByCourse);
};
