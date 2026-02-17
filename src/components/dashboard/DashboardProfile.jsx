import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../../config';
import { FaCloudUploadAlt, FaUserCircle, FaCheck, FaTimes } from 'react-icons/fa';

const DashboardProfile = () => {
    const [name, setName] = useState("Ciise Caalim");
    const [role, setRole] = useState("Admin");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    React.useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/profile`);
                if (res.data) {
                    setName(res.data.name || "Ciise Caalim");
                    setRole(res.data.role || "Admin");
                    if (res.data.image) {
                        setPreview(`${API_URL}${res.data.image}`);
                    }
                }
            } catch (err) {
                console.error("Failed to load profile", err);
            }
        };
        fetchProfile();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (image) formData.append("image", image);
        formData.append("name", name);
        formData.append("role", role);

        try {
            setLoading(true);
            await axios.post(`${API_URL}/api/profile/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            alert("Profile Updated Successfully!");
            window.location.reload();
        } catch (error) {
            console.error("Upload failed", error);
            alert("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    const clearSelection = () => {
        setImage(null);
        setPreview(null);
    };

    return (
        <div className="glass-dark p-8 rounded-2xl border border-white/10 max-w-2xl mx-auto shadow-2xl animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                Update Profile
            </h2>
            <p className="text-gray-400 mb-8">Update your personal details and profile picture.</p>

            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-300 transition"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Role / Title</label>
                        <input
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-300 transition"
                        />
                    </div>
                </div>

                {/* Drag & Drop Area */}
                <div
                    className={`relative custom-dashed-border rounded-xl p-10 flex flex-col items-center justify-center transition-all duration-300 group
                    ${dragActive ? 'bg-purple-500/10 border-purple-400 scale-[1.02]' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        id="file-upload"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={handleFileChange}
                        accept="image/*"
                    />

                    {preview ? (
                        <div className="relative">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded-full border-4 border-purple-500 shadow-lg mb-4"
                            />
                            <button
                                type="button"
                                onClick={clearSelection}
                                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition z-20"
                                title="Remove image"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    ) : (
                        <div className="text-6xl text-gray-500 mb-4 group-hover:text-purple-400 transition-colors duration-300">
                            <FaCloudUploadAlt />
                        </div>
                    )}

                    <div className="text-center z-0 pointer-events-none">
                        {preview ? (
                            <p className="text-green-400 font-medium flex items-center gap-2 justify-center">
                                <FaCheck /> Image Selected
                            </p>
                        ) : (
                            <>
                                <p className="text-xl font-medium text-gray-200 mb-2">
                                    Drag & drop or <span className="text-purple-400">click to browse</span>
                                </p>
                                <p className="text-sm text-gray-500">Supports JPG, PNG, WEBP (Max 5MB)</p>
                            </>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-2 shadow-lg
                        ${loading ? 'opacity-70 cursor-wait bg-gray-600' : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 hover:shadow-purple-500/25 transform hover:-translate-y-1'}`}
                    >
                        {loading ? 'Uploading...' : 'Save Changes'}
                        {!loading && <FaCheck />}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DashboardProfile;
