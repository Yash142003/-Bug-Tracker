import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/user/projects/${project._id}`}
      className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition"
    >
      <h3 className="font-bold text-gray-800">{project.title}</h3>
      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
        {project.description || "No description"}
      </p>
    </Link>
  );
}
