import { useState, useEffect } from "react";
import axios from "axios";

export default function FeedPage({ user }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    hostel: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch Feedback
  useEffect(() => {
    axios
      .get("http://localhost:5050/api/car/feedback", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setFeedbacks(res.data.data || []);
      })
      .catch((err) =>
        console.error("Error fetching feedback:", err.response?.data || err)
      );
  }, []);

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5050/api/car/feedback",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        setFeedbacks([response.data.data, ...feedbacks]); // Add new feedback
        setFormData({
          name: "",
          email: "",
          phone: "",
          hostel: "",
          description: "",
        }); // Reset form
      } else {
        setError(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to submit feedback.");
    }

    setLoading(false);
  };

  // ✅ Handle Delete Feedback (Only Own Feedback)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/car/feedback/${id}`, {
        withCredentials: true,
      });
      setFeedbacks(feedbacks.filter((fb) => fb._id !== id));
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">User Feedback</h1>

        {/* ✅ Feedback Form */}
        <form
          className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 bg-gray-700 rounded focus:outline-none"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 bg-gray-700 rounded focus:outline-none"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Phone"
            className="w-full p-3 bg-gray-700 rounded focus:outline-none"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Car Name and Brand"
            className="w-full p-3 bg-gray-700 rounded focus:outline-none"
            value={formData.hostel}
            onChange={(e) =>
              setFormData({ ...formData, hostel: e.target.value })
            }
          />
          <textarea
            placeholder="Your Feedback"
            className="w-full p-3 bg-gray-700 rounded focus:outline-none"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>

        {/* ✅ Feedback List */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Recent Feedback</h2>
          {feedbacks.length === 0 ? (
            <p className="text-gray-400">No feedback available.</p>
          ) : (
            <div className="space-y-4">
              {feedbacks.map((feedback) => (
                <div
                  key={feedback._id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-bold">{feedback.name}</h3>
                  <p className="text-gray-400 text-sm">{feedback.email}</p>
                  <p className="mt-3">{feedback.description}</p>
                  {feedback.hostel && (
                    <p className="text-sm text-gray-400">
                      Car: <strong>{feedback.hostel}</strong>
                    </p>
                  )}

                  {/* ✅ Show Delete Button Only for Owner */}
                  {user?.email === feedback.email && (
                    <button
                      className="mt-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                      onClick={() => handleDelete(feedback._id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
