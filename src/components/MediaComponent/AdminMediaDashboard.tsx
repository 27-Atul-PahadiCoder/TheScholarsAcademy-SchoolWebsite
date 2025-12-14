import React, { useState, useEffect } from "react";
import { Plus, Edit, Move, Trash2 } from "lucide-react";
import RenameModal from "./RenameModal";
import ChangePathModal from "./ChangePathModal";
import DeleteModal from "./DeleteModal";
import Modal from "./Modal"; // Import the Modal component
import {
  renameMedia,
  changeMediaPath,
  deleteMedia,
  getMedia,
} from "../../api/media";

interface Media {
  id: string;
  filename: string;
  url: string;
  mime_type: string;
  size: number;
  description?: string;
  status: "used" | "not used";
  location: string;
}

type NotificationType = "success" | "error";

const AdminMediaDashboard: React.FC = () => {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showRenameModal, setShowRenameModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showChangePathModal, setShowChangePathModal] =
    useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [location, setLocation] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterLocation, setFilterLocation] = useState<string>("");
  const [visibleMediaCount, setVisibleMediaCount] = useState<number>(20);
  const [notification, setNotification] = useState<{
    message: string;
    type: NotificationType;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const response = await getMedia();
        const mediaData = response.data; // Access the data property
        const mediaWithLocation = mediaData.map((item: any) => ({
          ...item,
          status: "used", // This is mock data, replace with actual status
          location: item.url.substring(0, item.url.lastIndexOf('/')), // Use string manipulation for location
        }));
        setMedia(mediaWithLocation);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  const showNotification = (message: string, type: NotificationType) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleRenameClick = (item: Media) => {
    setSelectedMedia(item);
    setShowRenameModal(true);
  };

  const handleChangePathClick = (item: Media) => {
    setSelectedMedia(item);
    setShowChangePathModal(true);
  };

  const handleDeleteClick = (item: Media) => {
    setSelectedMedia(item);
    setShowDeleteModal(true);
  };

  const handleRename = async (newName: string) => {
    if (selectedMedia) {
      const oldPath = selectedMedia.url;
      const result = await renameMedia(oldPath, newName);
      if (result.success) {
        const updatedMedia = media.map((item) =>
          item.id === selectedMedia.id
            ? {
                ...item,
                filename: newName,
                url:
                  item.url.substring(0, item.url.lastIndexOf("/") + 1) + newName,
              }
            : item
        );
        setMedia(updatedMedia);
        showNotification(result.message, "success");
      } else {
        showNotification(result.message, "error");
      }
    }
    setShowRenameModal(false);
  };

  const handleChangePath = async (newPath: string) => {
    if (selectedMedia) {
      const result = await changeMediaPath(selectedMedia.url, newPath);
      if (result.success) {
        const updatedMedia = media.map((item) =>
          item.id === selectedMedia.id ? { ...item, url: newPath } : item
        );
        setMedia(updatedMedia);
        showNotification(result.message, "success");
      } else {
        showNotification(result.message, "error");
      }
    }
    setShowChangePathModal(false);
  };

  const handleDelete = async () => {
    if (selectedMedia) {
      const result = await deleteMedia(selectedMedia.url);
      if (result.success) {
        const updatedMedia = media.filter(
          (item) => item.id !== selectedMedia.id
        );
        setMedia(updatedMedia);
        showNotification(result.message, "success");
      } else {
        showNotification(result.message, "error");
      }
    }
    setShowDeleteModal(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleUpload = () => {
    // Mock upload logic
    if (file && location) {
      console.log(`Uploading ${file.name} to ${location}`);
    }
    setShowAddModal(false);
    setFile(null);
    setLocation("");
  };

  const filteredMedia = media
    .filter(
      (item) =>
        item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.url.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((item) =>
      filterLocation ? item.location === filterLocation : true
    );

  const locations = [...new Set(media.map((item) => item.location))];

  const handleShowMore = () => {
    setVisibleMediaCount((prevCount) => prevCount + 20);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-2xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-4"> {/* Removed container mx-auto, kept p-4 for internal spacing */}
      {notification && (
        <div
          className={`fixed top-4 left-1/2 -translate-x-1/2 p-4 mb-4 text-white rounded shadow-lg z-50 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Media Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add Media
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name or path"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          className="border p-2"
        />
        <select
          value={filterLocation}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFilterLocation(e.target.value)
          }
          className="border p-2"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Thumbnail</th>
              {/* <th className="py-2 px-4 border-b">Name</th> */}
              <th className="py-2 px-4 border-b">Path</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedia.slice(0, visibleMediaCount).map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b">
                  {item.mime_type.startsWith("image") ? (
                    <img
                      src={item.url}
                      alt={item.filename}
                      className="w-10 h-10 object-cover"
                    />
                  ) : (
                    <video src={item.url} className="w-10 h-10 object-cover" />
                  )}
                </td>
                {/* <td className="py-2 px-4 border-b">{item.filename}</td> */}
                <td className="py-2 px-4 border-b">{item.url}</td>
                <td className="py-2 px-4 border-b">{item.location}</td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === "used"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleRenameClick(item)}
                      className="flex items-center bg-blue-500 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded transition-colors duration-300"
                    >
                      <Edit size={16} className="mr-2" />
                      Rename
                    </button>
                    <button
                      onClick={() => handleChangePathClick(item)}
                      className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded transition-colors duration-300"
                    >
                      <Move size={16} className="mr-2" />
                      Change Path
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item)}
                      className="flex items-center bg-red-500 hover:bg-red-600 text-black font-bold py-2 px-4 rounded transition-colors duration-300"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {visibleMediaCount < filteredMedia.length && (
        <div className="mt-4 text-center ">
          <button
            onClick={handleShowMore}
            className="bg-blue-500 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:scale-105 hover:shadow-xl hover:bg-blue-600 transition-all duration-500 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500"
          >
            Show More
          </button>
        </div>
      )}

      {/* Add Media Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Media</h2>
          <button onClick={() => setShowAddModal(false)}>
            <Plus size={24} className="transform rotate-45" />
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          <input type="file" onChange={handleFileChange} />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={handleLocationChange}
            className="border p-2"
          />
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Upload
          </button>
        </div>
      </Modal>

      <RenameModal
        isOpen={showRenameModal}
        onClose={() => setShowRenameModal(false)}
        onRename={handleRename}
        oldPath={selectedMedia?.filename || ""}
      />

      <ChangePathModal
        isOpen={showChangePathModal}
        onClose={() => setShowChangePathModal(false)}
        onChangePath={handleChangePath}
        oldPath={selectedMedia?.url || ""}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
        path={selectedMedia?.url || ""}
      />
    </div>
  );
};

export default AdminMediaDashboard;