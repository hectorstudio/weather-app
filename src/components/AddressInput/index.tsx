import { ChangeEvent, useState } from "react";

const AddressInput = ({
  search,
  addresses,
  onAddressChange,
  onClickItem,
}: {
  search: string;
  addresses: { value: string; label: string }[];
  onAddressChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickItem: (obj: { value: string, label: string }) => void;
}) => {
  const [open, setOpen] = useState(false);

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    onAddressChange(e); // Update Parent State for search query chagning
    if (e.target.value !== '') {
      setOpen(true); // Open Dropdown menu
    }
  };

  const handleClickItem = (obj: { value: string; label: string }) => {
    onClickItem(obj);
    setOpen(false); // Hide Dropdown menu
  };

  return (
    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
      <div className="relative">
        <div className="mt-1 flex flex-col">
          <input
            type="text"
            name="address"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm px-4 py-2 border-gray-300 rounded-md"
            placeholder="Type address..."
            value={search}
            onChange={handleAddressChange}
          />
          {open && (
            <div
              className="origin-top-right top-8 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={-1}
            >
              <div className="py-1" role="none">
                {addresses.map((el) => (
                  <div
                    className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-0"
                    onClick={() => handleClickItem(el)}
                    key={el.value}
                  >
                    {el.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressInput;
