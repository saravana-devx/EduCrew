interface ConfirmDeleteModalProps {
  onClick: () => void;
  buttonText: string;
  description: string;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  onClick,
  buttonText,
  description,
  modalOpen,
  setModalOpen,
}) => {
  if (!modalOpen) return null; // Prevents rendering when modal is closed

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold">Are you sure?</h2>
        <p className="text-gray-500 mt-2">{description}</p>
        <div className="flex justify-end space-x-3 mt-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            onClick={() => {
              onClick();
              setModalOpen(false);
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
