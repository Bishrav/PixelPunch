import React, { useEffect, useState } from "react";
import API from "./services/api";
import "./Profile.css"; // Reusing the dark theme styles

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        imageUrl: "",
        link: "",
        techStack: ""
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data } = await API.get("/projects");
            setProjects(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await API.delete(`/projects/${id}`);
            setProjects(projects.filter(p => p.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditClick = (project) => {
        setCurrentProject(project);
        setFormData({
            title: project.title,
            description: project.description,
            imageUrl: project.imageUrl,
            link: project.link,
            techStack: project.techStack
        });
        setIsEditing(true);
    };

    const handleCreateClick = () => {
        setCurrentProject(null);
        setFormData({
            title: "",
            description: "",
            imageUrl: "",
            link: "",
            techStack: ""
        });
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentProject) {
                // Update
                const { data } = await API.put(`/projects/${currentProject.id}`, formData);
                setProjects(projects.map(p => p.id === currentProject.id ? data : p));
            } else {
                // Create
                const { data } = await API.post("/projects", formData);
                setProjects([...projects, data]);
            }
            setIsEditing(false);
        } catch (err) {
            console.error(err);
            alert("Failed to save project");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="profile-container">
            <div className="profile-header" style={{ justifyContent: 'space-between' }}>
                <h2>My Projects</h2>
                <button onClick={handleCreateClick} className="btn add">Add New Project</button>
            </div>

            {isEditing && (
                <div className="overview-card" style={{ marginBottom: '20px' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input name="title" value={formData.title} onChange={handleChange} placeholder="Project Title" className="edit-input" required />
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="edit-textarea" />
                        <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" className="edit-input" />
                        <input name="link" value={formData.link} onChange={handleChange} placeholder="Project Link" className="edit-input" />
                        <input name="techStack" value={formData.techStack} onChange={handleChange} placeholder="Tech Stack" className="edit-input" />
                        <div className="form-actions">
                            <button type="submit" className="btn save">Save</button>
                            <button type="button" onClick={() => setIsEditing(false)} className="btn cancel">Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="my-listings">
                {projects.map((project) => (
                    <div key={project.id} className="listing-card">
                        {project.imageUrl && <img src={project.imageUrl} alt={project.title} />}
                        <div className="listing-info" style={{ display: 'block' }}>
                            <p className="car-name" style={{ fontSize: '18px', fontWeight: 'bold' }}>{project.title}</p>
                            <p className="car-price">{project.techStack}</p>
                            <p style={{ color: '#ccc', fontSize: '12px', margin: '10px 0' }}>{project.description}</p>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button onClick={() => handleEditClick(project)} className="btn edit" style={{ padding: '5px 10px', fontSize: '12px' }}>Edit</button>
                                <button onClick={() => handleDelete(project.id)} className="btn logout" style={{ padding: '5px 10px', fontSize: '12px' }}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
