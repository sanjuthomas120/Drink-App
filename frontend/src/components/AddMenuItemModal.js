import React, { useEffect, useState } from "react";
import API from "../api";

function AddMenuItemModal({ isOpen, onClose, menuId, onMenuItemAdded }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
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

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!name || !description || isNaN(price) || parseFloat(price) <= 0) {
        setError("Please ensure all fields are filled out correctly.");
        setLoading(false);
        return;
      }
    try {
      const response = await API.post(`/menus/${menuId}/items`, {
        name,
        description,
        price: parseFloat(price),
      });

      if (response.data?.success) {
        setName("");
        setDescription("");
        setPrice("");
        onMenuItemAdded();
        onClose();
      } else {
        console.error("Error adding menu item");
      }
    } catch (error) {
      console.error("Error adding menu item:", error);
      setError("Failed to add menu Item. Please try again.");
    } finally{
        setLoading(false)
    }
  };

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50 px-10">
      <div
        className="relative bg-cover bg-center w-[800px] p-6 rounded-lg shadow-lg border border-gray-300"
        style={{ backgroundImage: "url('/images/banner/Rectangle 116.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>

        <div className="relative z-10 text-white">
          <h2 className="text-xl font-bold mb-4">Add New Menu Item</h2>
          {error && <p className="text-red-500 font-oswald mb-2">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium">Item Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Price</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
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

export default AddMenuItemModal;
