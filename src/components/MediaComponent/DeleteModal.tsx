
import React from 'react';
import Modal from './Modal';
import { Plus } from "lucide-react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  path: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onDelete, path }) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Delete Image</h2>
        <button onClick={onClose}>
          <Plus size={24} className="transform rotate-45" />
        </button>
      </div>
      <p className="mb-4">Are you sure you want to delete this image?</p>
      <p className="mb-4 bg-gray-100 p-2 rounded">{path}</p>
      <div className="flex justify-end">
        <button onClick={onClose} className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
          Cancel
        </button>
        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
