import React, { useState } from 'react';
import axios from 'axios';

const API = "https://my-portafolio-server-1.onrender.com";

const DashboardProfile = () => {

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) return alert("Select image first");

        const formData = new FormData();
        formData.append("image", image);

        try {
            setLoading(true);

            await axios.post(`${API}/api/profile/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            alert("Profile Image Updated Successfully");
            window.location.reload();

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10">
            <h2 className="text-2xl font-bold mb-6">Update Profile Image</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                />

                <button
                    type="submit"
                    className="bg-yellow-400 px-6 py-2 rounded"
                >
                    {loading ? "Uploading..." : "Upload"}
                </button>
            </form>
        </div>
    );
};

export default DashboardProfile;
