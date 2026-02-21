Notes

const getCourses = async () => {
.find({ price :{ $gte : 100}, isPublished: false })
   .find({ price :{ $in : [1000, 500, 1200]}})
   { $or: [ { price: { $gte :500 }}, { isPublished: false}]}
   { $or: [ { price: { $gte :500 }}, { isPublished: false}]}
   find({ author: /.*ramesh.*/i })  //   { tags: {$in: ["backend"]}} ==== { tags: "backend" }
{isPublished: true, $or: [ {tags: "frontend"}, {tags: "backend"} ] } const pageNumber = 1;
const pageSize = 15;
const coursesResponse = await Course.find({ price: { $gte: 0 }, name: /._ker._/i }); // .skip((pageNumber - 1) \* pageSize)
.limit(pageSize);
.sort({ name: "desc" });
console.log("coursesResponse >>> ", coursesResponse, coursesResponse?.length);
};const getCourseById = async (id) => {
const course = await Course.findById(id);
console.log("course", course);
};
