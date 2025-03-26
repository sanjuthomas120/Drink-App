import React, { useState, useEffect } from "react";
import API from "../api";

function AddMenuModal({ isOpen, onClose, onMenuAdded }) {
  const [menuName, setMenuName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await API.post("/menus", {
        name: menuName,
        description: description,
      });

      console.log("Menu added successfully:", response.data);
      setMenuName("");
      setDescription("");
      onMenuAdded();
      onClose();
    } catch (err) {
      console.error("Error adding menu:", err);
      setError("Failed to add menu. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50 px-10">
      <div
        className="relative bg-cover bg-center w-[800px] p-6 rounded-lg shadow-lg border border-gray-300"
        style={{ backgroundImage: "url('/images/banner/Rectangle 116.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>

        <div className="relative z-10 text-white">
          <h2 className="text-xl font-bold mb-4">Add New Menu</h2>
          {error && <p className="text-red-500 font-oswald mb-2">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium">Menu Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                value={menuName}
                onChange={(e) => setMenuName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Description</label>
              <textarea className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               required
               ></textarea>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 bg-primary text-white rounded"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-secondary text-white rounded"
                disabled={loading}
              >
                 {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full"
                      viewBox="0 0 24 24"
                    ></svg>
                    Adding...
                  </span>
                ) : (
                  "Add Menu"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMenuModal;
