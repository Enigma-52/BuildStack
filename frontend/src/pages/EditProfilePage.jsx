import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { Button } from "../components/ui/button";
import { Upload } from "lucide-react";
import Footer from "../components/Footer";
import useScrollToTopNavigate from "../components/routes/route";

const EditProfilePage = () => {
  const router = useScrollToTopNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    headline: "",
    about: "",
    role: "",
    currentCompany: "",
    github: "",
    twitter: "",
    linkedin: "",
    profile_image_url: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const targetUserId = localStorage.getItem("userId");  

      const response = await fetch(`${import.meta.env.VITE_USER_SERVICE_URL}/api/auth/profile?userId=${targetUserId}`);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to fetch profile");
      }

      const data = await response.json();
      setFormData({
        name: data.name || "",
        email: data.email || "",
        headline: data.headline || "",
        about: data.about || "",
        role: data.role || "",
        currentCompany: data.currentCompany || "",
        github: data.github_url || "",
        twitter: data.twitter_url || "",
        linkedin: data.linkedin_url || "",
        profile_image_url: data.profile_image_url

      });
    } catch (error) {
      setError(error.message);
      if (error.message.includes("Authentication")) {
        router("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    const userId = localStorage.getItem("userId");
    router(`/profile/${userId}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {


      const userId = localStorage.getItem("userId");

      let imageUrl = null;
    if (uploadedImage) {
      const apiKey = "7fdc2bd905952051c04dd15a66326231";
      const formData = new FormData();
      
      // Get the base64 part of the data URL
      const base64Image = uploadedImage.split(',')[1];
      formData.append("image", base64Image);

      const imageUploadResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`, {
          method: 'POST',
          body: formData,
      });

      if (!imageUploadResponse.ok) {
        const errorData = await imageUploadResponse.json();
        console.error('ImgBB Error:', errorData);
        throw new Error('Failed to upload image');
      }

      const imageData = await imageUploadResponse.json();
      if (imageData.success) {
        imageUrl = imageData.data.url;
        console.log('Successfully uploaded image:', imageUrl);
      } else {
        throw new Error('Failed to get image URL from response');
      }
    }
      console.log("IMAGE",imageUrl);
  
      const response = await fetch(`${import.meta.env.VITE_USER_SERVICE_URL}/api/auth/profile?userId=${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          headline: formData.headline,
          about: formData.about,
          role: formData.role,
          currentCompany: formData.currentCompany,
          twitter: formData.twitter,
          github: formData.github,
          linkedin: formData.linkedin,
          profile_url: imageUrl}),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      router(`/profile/${userId}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }


  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-pink-50 via-blue-50 to-orange-50 pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Profile Picture Section */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src={uploadedImage || "/api/placeholder/120/120"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-contain border-2 border-orange-200"
                  />
                  <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-50">
                    <Upload className="w-4 h-4 text-gray-600" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Profile Picture</h3>
                  <p className="text-sm text-gray-500">
                    PNG, JPG up to 10MB. Recommended size: 400x400px
                  </p>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Headline
                  </label>
                  <input
                    type="text"
                    name="headline"
                    value={formData.headline}
                    onChange={handleChange}
                    placeholder="e.g., Full Stack Developer | Building cool stuff"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    About
                  </label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Work Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Select a role</option>
                    <option value="developer">Developer</option>
                    <option value="designer">Designer</option>
                    <option value="product_manager">Product Manager</option>
                    <option value="founder">Founder</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Company
                  </label>
                  <input
                    type="text"
                    name="currentCompany"
                    value={formData.currentCompany}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GitHub
                    </label>
                    <input
                      type="url"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      placeholder="https://github.com/username"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Twitter
                    </label>
                    <input
                      type="url"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleChange}
                      placeholder="https://twitter.com/username"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="px-6"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="px-6 bg-gradient-to-r from-orange-600 to-orange-400 text-white hover:from-orange-700 hover:to-orange-500"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfilePage;