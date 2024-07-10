interface ModalButtonProps {
  handleSave: () => void;
  onClose: () => void;
  cancelBtn?: boolean;
}

const ModalButton = ({
  handleSave,
  onClose,
  cancelBtn = true,
}: ModalButtonProps) => {
  return (
    <div className="flex mt-8 justify-end font-bold">
      <button
        onClick={handleSave}
        className="bg-teal-700 text-white px-4 py-2 mr-2 shadow-md rounded"
      >
        Simpan
      </button>
      <button
        onClick={onClose}
        className={`bg-gray-100 border border-gray-300 shadow-md text-teal-700 px-4 py-2 rounded ${
          cancelBtn ? "block" : "max-sm:hidden"
        }`}
      >
        Batal
      </button>
    </div>
  );
};

export default ModalButton;
